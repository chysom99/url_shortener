const shortid = require("shortid");
const Url = require("../../models/Url");
const baseUrl = "http://localhost:3000";
const utils = require("../../Utils/utils");
const { isValidObjectId } = require("../../Utils/validate");

const shorten = async (req, res) => {
  try {
    const { longUrl } = req.body;
    const urlCode = shortid.generate();

    if (!utils.validateUrl(longUrl)) {
      return res.status(401).json({ message: "Invalid Long URL" });
    }
    let url = await Url.findOne({ longUrl });
    if (!url) {
      const shortUrl = baseUrl + "/" + urlCode;
      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date(),
      });
      url = await url.save();
      return res.status(201).json(url);
    }
    return res.status(200).json(url);
  } catch (err) {
    return res.status(500).json("An Error Occurred");
  }
};

const deleteurl = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(401).json({ message: "Url id is invalid" });
  let url = await Url.findOneAndDelete({ _id: id });
  if (!url) return res.status(400).json({ message: "url not found" });
  else return res.status(200).json({ message: "url deleted" });
};

const geturl = async (req, res) => {
  const url = await Url.find({});
  return res.status(200).json({ url });
};

const redirect = async (req, res) => {
  try {
    const { urlCode } = req.params;
    const url = await Url.findOne({ urlCode });
    if (url) {
      await Url.updateOne(
        {
          urlCode: req.params.urlCode,
        },
        { $inc: { clicks: 1 } }
      );
      return res.redirect(url.longUrl);
    } else return res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  shorten: shorten,
  redirect: redirect,
  geturl: geturl,
  deleteurl: deleteurl,
};
