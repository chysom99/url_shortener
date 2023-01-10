const express = require("express");
const User = require("../../models/User");

const validateUser = async (req, res, next) => {
  try {
    const username = await User.findOne({
      username: req.body.username,
    });

    if (username) {
      return res.status(409).json({ message: "username already exist" });
    }

    const emailcheck = await User.findOne({
      email: req.body.email,
    });

    if (emailcheck) {
      return res.status(409).json({ message: "email already exist" });
    }

    next();
  } catch (error) {}
};

module.exports = {
  validateUser,
};
