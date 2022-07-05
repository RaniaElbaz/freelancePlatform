const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    issued: {
      type: Date,
      required: true,
    },
    comment: {
      required: true,
      type: String,
    },
    project: {
      type: Number,
      required: true,
      ref: "projects",
    },
  },
  { _id: false }
);

module.exports = testimonialSchema;
