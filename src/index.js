const express = require("express");
const app = express();
const routes = require("../src/api/routes/index");
const redirect = require("./api/controllers/url");
//const router = express.Router();

require("../src/models/index");

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", routes);
app.use("/", routes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on " + (process.env.PORT || 3000));
});
module.exports = app;
