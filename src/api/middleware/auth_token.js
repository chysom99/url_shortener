const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (auth) {
      const splitValue = auth.split(" ");
      const token = splitValue[1];

      if (token) {
        const result = jwt.verify(token, process.env.secretKey);

        if (result) {
          req.user_id = result.id;
          next();
        } else {
          return res.status(400).json({ messages: "inavlid token" });
        }
      } else {
        return res.status(400).json({ messages: "inavlid token" });
      }
    } else {
      return res.status(400).json({ messages: "inavlid token" });
    }
  } catch (err) {
    return res.status(400).json({ messages: "inavlid token" });
  }
};
