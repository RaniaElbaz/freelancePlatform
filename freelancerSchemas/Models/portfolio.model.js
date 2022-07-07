const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    projectTitle: {
      required: true,
      type: String,
    },
    relatedJob: {
      type: Number,
      ref: "projects",
    },
    completionDate: {
      required: true,
      type: Date,
    },
    files: {
      required: true,
      type: [String],
    },
    skills: {
      type: [Number],
      ref: "skills",
      validate: {
        validator: function (value) {
          const duplicated = value.filter(
            (item, index) => value.indexOf(item) !== index
          );
          return !Boolean(duplicated.length);
        },
        message: (props) => `${props.value} duplicated skill value`,
      },
    },
    url: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      minLength: 100,
      maxLength: 1000,
    },
    index: {
      type: Number,
    },
  },
  { _id: false }
);

module.exports = portfolioSchema;