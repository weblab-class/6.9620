const mongoose = require("mongoose");

const GameCodeSchema = new mongoose.Schema({
  code: {type: String, default: "AAAAAA"},
  gameType: String,
  numTurns: { type: Number, default: 6 },
  userId: String
});

// compile model from schema
module.exports = mongoose.model("gameCode", GameCodeSchema);