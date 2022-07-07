const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const talentSchema = require("./talent.model");

const validators = require("./validators.function");

const minCategories = 0;
const maxCategories = 10;

const skillSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  categories: {
    type: [Number],
    ref: "categories",
    validate: [
      {
        validator: validators.checkUniqueItems,
        message: "skill categories should be unique",
      },
      {
        validator: (items) =>
          validators.itemsLimit(items, minCategories, maxCategories),
        message: () =>
          `skill categories should be between ${minCategories},${maxCategories}`,
      },
    ],
  },
  talents: [talentSchema],
});

skillSchema.plugin(AutoIncrement, { id: "skillId" });

mongoose.model("skills", skillSchema);
