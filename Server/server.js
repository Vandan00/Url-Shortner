const { config } = require("dotenv");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const urls = require("./Urls/Url");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const urlRoutes = require("./routes/urlRoutes");
const redirect = require("./routes/redirect");
const { errorHandler, notFound } = require("./Middlewares/errorMiddleware");
const cors = require("cors");
app.use(cors());
const path = require("path");

// const connectDB = require("./config/db");

dotenv.config();
app.use(express.json());
// connectDB();

// app.get("/api/url", (req, res) => {
//   res.json(urls);
// });
app.get("/api/url/:id", (req, res) => {
  const url = urls.find((n) => n._id === req.params.id);
  res.send(url);
});
app.use("/api/users", userRoutes);
app.use("/api/urls", urlRoutes);
app.use("/", redirect);

// -----------Deployment--------------

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

// -------------------------

// mongoose.set("useCreateIndex", true);
mongoose
  .connect(process.env.MongoDB_URL, {
    dbName: process.env.MONGO_DB_Name,
    user: process.env.DB_User,
    pass: process.env.DB_Password,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connection estabislished with MongoDB");
  })
  .catch((error) => console.error(error.message));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server started at port ${PORT}`));
