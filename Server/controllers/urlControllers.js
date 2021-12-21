const Url = require("../models/urlModel.js");
const asyncHandler = require("express-async-handler");

const getUrl = asyncHandler(async (req, res) => {
  const url = await Url.find();
  res.json(url);
});

module.exports = { getUrl };
