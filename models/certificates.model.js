const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    organization: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    issued: {
      required: true,
      type: Date,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
    },
    id: {
      type: String,
    },
    expirationDate: {
      type: Date,
    }
  },
  { _id: false }
);

module.exports = certificateSchema;