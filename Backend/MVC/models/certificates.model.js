const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    organization: {
      type: String,
    },
    title: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
    },
    certificateId: {
      type: String,
    },
  },
  { _id: false }
);

module.exports = certificateSchema;