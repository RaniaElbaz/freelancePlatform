const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const testimonialSchema = require("./testimonial");
const analyticSchema = require("./analytic");

function membersLimit(members) {
  return members.length < 11 && members.length > 1;
}

function skillsLimit(skills) {
  return skills.length < 16 && skills.length > 1;
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
        validator: membersLimit,
        message: "team members should be between 2,10",
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
        validator: skillsLimit,
        message: "team skills should be between 2,15",
      },
      {
        validator: checkUniqueItems,
        message: "team skills items should be unique",
      },
    ],
  },
  projects: {
    //🔴🔴add in mw and controllers
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
  testimonial: {
    type: [testimonialSchema],
    validate: {
      validator: checkUniqueProject,
      message: "project already has testimonial",
    },
  },
  analytic: analyticSchema, //🟡🟡route for analytics and wallet and isVerified
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
