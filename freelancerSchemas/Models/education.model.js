const mongoose = require('mongoose');

// const dateSchema = require('./date.model');

const educationSchema = new mongoose.Schema({
    educationOrganization: {
        required: true,
        minLength: 3,
        type: String,
    },
    educationDegree:{
        required: true,
        minLength: 3,
        type: String,
    },
    areaOfStudy:{
        type: String,
        minLength: 5,
    },
    educationStartDate:{
        type: Date,
        required: true,
    },
    educationEndDate:{
        type: Date
    },
    educationDescription:{
        type: String,
        minLength: 100,
        maxLength: 500
    }
},{_id: false});

module.exports = educationSchema;