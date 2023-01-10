const express = require("express");
const router = express.Router();
const createUserController = require("../controllers/user");
const { signup, login } = createUserController;
const userAuth = require("../middleware/auth");
const auth_token = require("../middleware/auth_token");
const shorten = require("../controllers/url");
const deleteurl = require("../controllers/url");
const geturl = require("../controllers/url");
const redirect = require("../controllers/url");

router.post("/signup", userAuth.validateUser, signup);
router.post("/login", login);
router.post("/shorten", auth_token, shorten.shorten);
router.delete("/deleteurl/:id", auth_token, deleteurl.deleteurl);
router.get("/geturl", auth_token, geturl.geturl);
router.get("/:urlCode", redirect.redirect);
module.exports = router;
