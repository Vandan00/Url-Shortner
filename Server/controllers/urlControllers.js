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

module.exports = { getUrl, CreateUrl, getUrlById };
