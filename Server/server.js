const { config } = require("dotenv");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const urls = require("./Urls/Url");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const urlRoutes = require("./routes/urlRoutes");
const { errorHandler, notFound } = require("./Middlewares/errorMiddleware");

// const connectDB = require("./config/db");

dotenv.config();
app.use(express.json());
// connectDB();

// app.get("/", (req, res) => {
//   res.send("API is running");
// });
// app.get("/api/url", (req, res) => {
//   res.json(urls);
// });
app.get("/api/url/:id", (req, res) => {
  const url = urls.find((n) => n._id === req.params.id);
  res.send(url);
});
app.use("/api/users", userRoutes);
app.use("/api/urls", urlRoutes);

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
