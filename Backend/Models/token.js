const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  key: {
    type:String
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Token", TokenSchema);