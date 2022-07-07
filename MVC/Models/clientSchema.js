let mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

let analyticsSchema = require("./analyticsSchema");
let locationSchema = require("./locationSchema");
let testimonialSchema = require("./testimonialSchema");

// A ) Create Schema Object 

/*
const imageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img:
  {
    data: Buffer,
    contentType: String
  }
});
*/

const schema = new mongoose.Schema({
  _id: { type: Number }, // ! Handling
  firstName: {
    type: String, required: true, minLength: 3,
    maxLength: 10,
  },
  lastName: { type: String, required: true },
  password: {
    type: String,
    //  required: true
  },
  email: { type: String, required: true, unique: true },
  // accountType: { type: String, required: true },
  picture: {
    // type: imageSchema,  required: true // ! Handling
    type: String, required: true
  },
  location: {
    type: locationSchema, required: true
  },
  phoneNumber: { type: Number, required: true },
  analytics: {
    type: analyticsSchema
  },
  // ! handling
  wallet: { type: Number, default: 0 },
  description: {
    type: String, required: true,
    //  minLength: 50,
    maxLength: 1000,
  },
  isVerified: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  testimonial: [testimonialSchema], // ! handling
  // projects: {[Number], ref: "projects"}
}, { _id: false });

schema.plugin(AutoIncrement, { inc_field: '_id' });


// B) Mapping: connecting between the related schema and Collection
// Setter Schema
module.exports = mongoose.model("Client", schema);


