const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
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
      ref: "projects",
      required: true,
    },
  },
  { _id: false }
);
//testing comment
module.exports = testimonialSchema;
