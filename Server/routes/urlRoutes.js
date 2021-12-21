const express = require("express");

const {
  getUrl,
  CreateUrl,
  getUrlById,
} = require("../controllers/urlControllers");
// import {
//   //   getNoteById,
//   getUrl,
//   //   CreateNote,
//   //   DeleteNote,
//   //   UpdateNote,
// } from "../controllers/urlControllers.js";

// creating express route handler
const router = express.Router();

// import the Url database model
const Url = require("../models/urlModel");
const { protect } = require("../Middlewares/authMiddleware");

// @route    POST /api/url/create
// @description     Create short URL

// The API base Url endpoint

router.route("/").get(protect, getUrl);
router.route("/:id").get(getUrlById);
//   .delete(protect, DeleteUrl)
//   .put(protect, UpdateUrl);
router.route("/create").post(protect, CreateUrl);

module.exports = router;
