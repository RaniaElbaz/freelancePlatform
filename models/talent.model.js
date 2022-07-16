const mongoose = require("mongoose");

const talentSchema = new mongoose.Schema({
  _id: false,
  type: {
    type: String,
    required: true,
    enum: ["freelancers", "teams"],
  },
  id: {
    type: Number,
    required: true,
    refPath: "type",
  },
});

module.exports = talentSchema;
