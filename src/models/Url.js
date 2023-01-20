//const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UrlSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    urlCode: {
      type: String,
      required: true,
    },

    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: String,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
module.exports = mongoose.model("url", UrlSchema);
