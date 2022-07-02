const mongoose = require('mongoose');

const dateSchema = require('./dateSchema');

const educationSchema = new mongoose.Schema({
    organization: {
        required: true,
        minLength: 3,
        type: String,
    },
    degree:{
        required: true,
        minLength: 3,
        type: String,
    },
    areaOfStudy:{
        type: String,
        minLength: 5,
    },
    startDate:dateSchema,
    endDate:dateSchema,
    description:{
        type: String,
        minLength: 100,
        maxLength: 500
    }
},{_id: false});

module.exports = educationSchema;