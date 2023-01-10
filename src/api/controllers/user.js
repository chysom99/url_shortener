const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Signup
const signup = async (req, res) => {
  try {
    const { username, firstname, lastname, email, password } = req.body;
    const data = {
      username,
      email,
      firstname,
      lastname,
      password: await bcrypt.hash(password, 10),
    };
    const user = await User.create(data);
    return res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    return res.status(509).json({
      message: "An error occured while processing your request",
    });
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        var response = {
          loginToken: token,
        };
        return res
          .status(201)
          .json({ message: "Login successful", data: response });
      } else {
        return res.status(401).json({ message: "Authentication failed" });
      }
    } else {
      return res.status(404).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.log(error);
  }
  return res
    .status(500)
    .json({ message: "An error occurred while processing your request" });
};

module.exports = {
  signup,
  login,
};
