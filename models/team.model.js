const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const testimonialSchema = require("./testimonial.model");
const analyticSchema = require("./analytic.model");

function itemsLimit(items) {
  return items.length < 16 && items.length > 1;
}

function checkUniqueItems(items) {
  return new Set(items).size === items.length;
}

function checkUniqueProject(items) {
  let projArr = [];
  for (let item of items) {
    projArr.push(item.project);
  }
  return new Set(projArr).size === projArr.length;
}

const teamSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  description: {
    type: String,
    required: true,
    minLength: 100,
    maxLength: 1000,
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: 10,
    max: 100,
  },
  logo: {
    type: String,
  },
  members: {
    type: [Number],
    ref: "freelancers",
    validate: [
      {
        validator: itemsLimit,
        message: "team members should be between 2,15",
      },
      {
        validator: checkUniqueItems,
        message: "team members items should be unique",
      },
    ],
  },
  skills: {
    type: [Number],
    ref: "skills",
    validate: [
      {
        validator: itemsLimit,
        message: "team skills should be between 2,15",
      },
      {
        validator: checkUniqueItems,
        message: "team skills items should be unique",
      },
    ],
  },
  projects: {
    type: [Number],
    ref: "projects",
    validate: {
      validator: function (projects) {
        const duplicated = projects.filter(
          (item, index) => projects.indexOf(item) !== index
        );
        return !Boolean(duplicated.length);
      },
      message: (props) => `${props.value} duplicated project ID value`,
    },
  },
  testimonials: {
    type: [testimonialSchema],
    validate: {
      validator: checkUniqueProject,
      message: "project already has testimonial",
    },
  },
  analytics: analyticSchema,
  wallet: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

teamSchema.plugin(AutoIncrement, { id: "teamId" });

mongoose.model("teams", teamSchema);
