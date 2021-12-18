const { config } = require("dotenv");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const urls = require("./Urls/Url");

dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running");
});
app.get("/api/url", (req, res) => {
  res.json(urls);
});
app.get("/api/url/:id", (req, res) => {
  const url = urls.find((n) => n._id === req.params.id);
  res.send(url);
});

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server started at port ${PORT}`));
