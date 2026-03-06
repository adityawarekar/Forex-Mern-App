const mongoose = require("mongoose");

const forexUpdateSchema = new mongoose.Schema({
  pair: {
    type: String,
    required: true
  },
  bid: {
    type: Number,
    required: true
  },
  ask: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ForexUpdate = mongoose.model("ForexUpdate", forexUpdateSchema);

module.exports = ForexUpdate;