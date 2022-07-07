const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const recruiterSchema = require("./recruiter.model");
const talentSchema = require("./talent.model");
const proposalSchema = require("./proposal.model");
const budgetSchema = require("./budget.model");

const minConnects = 3,
  maxConnects = 20,
  minProposals = 0,
  maxProposals = 50;

const projectSchema = new mongoose.Schema({
  _id: Number,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 100,
    maxLength: 1000,
  },
  budget: {
    type: budgetSchema, //in route if project is in progress can't update budget
  },
  isInternship: {
    type: Boolean, //default false instead of required//updatable only by company
    default: false,
  },
  recruiter: recruiterSchema,
  categroy: {
    type: Number,
    required: true,
    ref: "categories",
  },
  skills: {
    type: [Number],
    required: true,
    ref: "skills",
  },
  duration: {
    type: String, //regex
  },
  connects: {
    type: Number,
    validate: {
      validator: (items) =>
        validators.itemsLimit(items, minConnects, maxConnects),
      message: () =>
        `project connects should be between ${minConnects},${maxConnects}`,
    },
  },

  /*properties below will be added in backend not by user*/
  createdAt: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["posted", "ongoing", "finished"],
    default: "posted",
  },
  talent: talentSchema,
  proposals: {
    type: [proposalSchema],
    validate: {
      validator: validators.itemsLimit(items, minProposals, maxProposals),
      message: `project proposals should be between ${minProposals},${minProposals}`,
    },
  },
});

projectSchema.plugin(AutoIncrement);
mongoose.model("projects", projectSchema);
