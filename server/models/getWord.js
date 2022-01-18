const mongoose = require("mongoose");

const GetWord = new mongoose.Schema({
  word: String
});

// compile model from schema
module.exports = mongoose.model("getWord", GetWord);