const express = require("express");

const {
  getUrl,
  CreateUrl,
  getUrlById,
  UpdateUrl,
  DeleteUrl,
} = require("../controllers/urlControllers");

// creating express route handler
const router = express.Router();

// import the Url database model
const Url = require("../models/urlModel");
const { protect } = require("../Middlewares/authMiddleware");

router.route("/").get(protect, getUrl);
router
  .route("/:id")
  .get(getUrlById)
  .put(protect, UpdateUrl)
  .delete(protect, DeleteUrl);
router.route("/create").post(protect, CreateUrl);

module.exports = router;
