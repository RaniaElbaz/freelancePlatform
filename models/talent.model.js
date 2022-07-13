const mongoose = require("mongoose");

const talentSchema = new mongoose.Schema({
  _id: false,
  type: {
    type: String,
    required: true,
    enum: ["categories", "teams"], //replace categories with freelancers
  },
  id: {
    type: Number,
    required: true,
    // ref: "teams",
    refPath: "type",
  },
});

module.exports = talentSchema;
