let mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


let analyticsSchema = require("./analytics.model");
let locationSchema = require("./location.model");
let testimonialSchema = require("./testimonial.model");


// A ) Create Schema Object 


const imageSchema = new mongoose.Schema({
  name: String,
  imgPath: String
});


const schema = new mongoose.Schema({
  _id: { type: Number },
  firstName: {
    type: String, required: true, minLength: 3,
    maxLength: 10,
  },
  lastName: { type: String, required: true },
  password: { type: String },
  email: { type: String, required: true, unique: true },
  // accountType: { type: String, required: true },
  picture: {
    type: imageSchema
  },
  location: {
    type: locationSchema, default: {}
  },
  phoneNumber: { type: Number, default: 0 },
  analytics: {
    type: analyticsSchema, default: {}
  },
  wallet: { type: Number, default: 0 },
  description: {
    type: String,
    //  minLength: 50,
    maxLength: 1000,
    default: ""
  },
  isVerified: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  testimonial: [testimonialSchema], // ! handling
  projects: { type: [Number], ref: "projects" },
  resetLink: { type: String, default: '' },
  loginToken: { type: String, default: '' }
}, { timestamps: true });

schema.plugin(AutoIncrement, { inc_field: '_id' });


// B) Mapping: connecting between the related schema and Collection
// Setter Schema
module.exports = mongoose.model("clients", schema);


