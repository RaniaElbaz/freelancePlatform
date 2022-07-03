const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const locationSchema = require('./locations');
const paymentSchema = require('./payment');
const educationSchema = require('./education');
const analyticsSchema = require('./analytics');
const certificateSchema = require('./certificates');
const testimonialSchema = require('./testimonial');
const portfolioSchema = require('./portfolio');
const experinceSchema = require('./experince');

const languages = {
    Ar: 'Arabic',
    En: 'English',
}

//create schema object
const freelancerSchema = new mongoose.Schema({
    _id:{
        type: Number,
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        validate: {
            validator: function(value) {
              return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },
            message: props => `${props.value} is not a valid email!`
        },
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    secondEmail:{
        type: String,
    },
    phoneNumber:{
        type: String,
        validate: {
            validator: function(value) {
              return /\d{3}-\d{3}-\d{4}/.test(value);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    profileImage:{
        type: String,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    hourlyRate:{
        type: Number,
    },
    wallet:{
        type: Number,
        default: 0,
        min: 0,
    },
    hoursPerWeek:{
        type: Number,
        default: 30,
        max:30,
        min:5
    },
    title:{
        type: String,
        minLength: 5
    },
    description:{
        type: String,
        minLength: 100,
        maxLength: 500
    },
    isBlocked:{
        type: Boolean,
        default: false,
    },

    // 1:Many embedded relationships
    languages:{
        type: [String],
        enum: languages,
        validate: {
            validator: function(value) {
              const duplicated = value.filter((item, index) => value.indexOf(item) !== index)
              return !Boolean(duplicated.length);
            },
            message: props => `${props.value} duplicated language value`
        },
    },
    education:[educationSchema],
    testimonials:[testimonialSchema],
    certificates:[certificateSchema],
    portfolio:[portfolioSchema],
    experience:{
        type: [experinceSchema],
        validate: {
            validator: function(value) {
              const duplicated = value.filter((item, index) => value.indexOf(item) !== index)
              return !Boolean(duplicated.length);
            },
            message: props => `${props.value} duplicated experience value`
        },
    },
    
    // 1:Many parent ref relationships
    projects:{
        type: [Number],
        ref: "projects",
        validate: {
            validator: function(value) {
              const duplicated = value.filter((item, index) => value.indexOf(item) !== index)
              return !Boolean(duplicated.length);
            },
            message: props => `${props.value} duplicated project ID value`
        },
    },
    badges:{
        type: [Number],
        ref: "tests",
        validate: {
            validator: function(value) {
              const duplicated = value.filter((item, index) => value.indexOf(item) !== index)
              return !Boolean(duplicated.length);
            },
            message: props => `${props.value} duplicated language value`
        },
    },

    //many:many 2-way ref relationships
    skills:{
        type: [Number],
        ref:"skills",
        validate: {
            validator: function(value) {
              const duplicated = value.filter((item, index) => value.indexOf(item) !== index)
              return !Boolean(duplicated.length);
            },
            message: props => `${props.value} duplicated skill value`
        }
    },
    
    //1:1 embedded relationships
    //paymentMethods: paymentSchema,
    analytics: analyticsSchema,
    address: locationSchema
}, { _id: false });

//mapping
freelancerSchema.plugin(AutoIncrement, {id: 'freelancerID'});
mongoose.model("freelancers",freelancerSchema);