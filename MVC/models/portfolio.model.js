const mongoose = require("mongoose");
const portfolioSchema = new mongoose.Schema(
  {
    projectTitle: {
      required: true,
      type: String,
    },
    relatedJob: {
      type: Number,
      ref: "projects",
      // validate: {
      //   validator: function (v) {
      //     const duplicated = v.filter(
      //       (item, index) => v.indexOf(item) !== index
      //     );
      //     return !Boolean(duplicated.length);
      //   },
      //   message: (props) => `${props.value} duplicated project value`,
      // },
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
        validator: function (v) {
          const duplicated = v.filter(
            (item, index) => v.indexOf(item) !== index
          );
          return !Boolean(duplicated.length);
        },
        message: (props) => `${props.value} duplicated skill value`,
      },
    },
    URL: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      minLength: 100,
      maxLength: 1000,
    },
  },
  { _id: false }
);
module.exports = portfolioSchema;
