const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  _id: false,
  id: {
    type: Number,
    required: true,
    refPath: "type",
  },
  type: {
    type: String,
    required: true,
    enum: ["clients", "companies", "admins"],
  },
});

module.exports = recruiterSchema;
