const Url = require("../models/urlModel.js");
const asyncHandler = require("express-async-handler");
const validUrl = require("valid-url");
const shortid = require("shortid");
const baseUrl = "http:localhost:5000";

const getUrl = asyncHandler(async (req, res) => {
  const url = await Url.find();
  res.json(url);
});
const CreateUrl = asyncHandler(async (req, res) => {
  const { longUrl } = req.body;
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }

  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({
        longUrl,
      });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          user: req.user._id,
          longUrl,
          shortUrl,
          urlCode,
          //   date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid longUrl");
  }
});

const getUrlById = asyncHandler(async (req, res) => {
  const url = await Url.findById(req.params.id);

  if (url) {
    res.json(url);
  } else {
    res.status(404).json({ message: "Url not found" });
  }

  res.json(url);
});
const UpdateUrl = asyncHandler(async (req, res) => {
  const { shortUrl } = req.body;

  const url = await Url.findById(req.params.id);

  if (url.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (url) {
    url.shortUrl = shortUrl;

    const updatedUrl = await url.save();
    res.json(updatedUrl);
  } else {
    res.status(404);
    throw new Error("Url not found");
  }
});
const DeleteUrl = asyncHandler(async (req, res) => {
  const url = await Url.findById(req.params.id);

  if (url.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (url) {
    await url.remove();
    res.json({ message: "Url Removed" });
  } else {
    res.status(404);
    throw new Error("Url not Found");
  }
});

module.exports = { getUrl, CreateUrl, getUrlById, UpdateUrl, DeleteUrl };
