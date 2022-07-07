const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const talentSchema = require("./talent.model");

const proposalSchema = new mongoose.Schema({
  _id: false,
  talents: talentSchema,
  text: {
    type: String,
  },
});

proposalSchema.plugin(AutoIncrement, { id: "proposalId" });
mongoose.model("proposals", proposalSchema);
