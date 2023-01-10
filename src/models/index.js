require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/url_shortener")
  .then(() => {
    console.log("Database connection successful");
  })

  .catch((err) => {
    console.log("Database connection failed", err);
  });

require("./User.js");
require("./Url.js");
