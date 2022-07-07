const mongoose = require("mongoose");

const talentSchema = new mongoose.Schema({
  _id: false,
  id: {
    type: Number,
    required: true,
    // ref: "teams",
    refPath: "type",
  },
  type: {
    type: String,
    required: true,
    enum: ["categories", "teams"], //replace categories with freelancers
  },
});

module.exports = talentSchema;
