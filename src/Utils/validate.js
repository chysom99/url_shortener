const mongoose = require("mongoose");

module.exports = {
  isValidObjectId: (id) => {
    return mongoose.Types.ObjectId.isValid(id);
  },
};
