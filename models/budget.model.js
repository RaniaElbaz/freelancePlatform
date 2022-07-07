const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  _id: false,
  type: {
    enum: ["fixed", "hourlyRate"],
    required: true,
  },
  value: {
    type: Number,
    required: true,
    min: 5,
    // max: 1000,
  },
});
module.exports = budgetSchema;
