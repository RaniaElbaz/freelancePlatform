const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    earnings: {
      type: Number,
      default: 0,
      min: 0,
      max: 1e6,
    },
    jobs: {
      type: Number,
      default: 0,
      min: 0,
      max: 1e6,
    },
    hours: {
      type: Number,
      default: 0,
      min: 0,
      max: 1e6,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
      max: 1e6,
    },
  },
  { _id: false }
);

module.exports = analyticsSchema;