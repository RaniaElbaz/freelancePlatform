const mongoose = require('mongoose');

const dateSchema = require('./dateSchema');

const educationSchema = new mongoose.Schema({
    organization: {
        required: true,
        type: String,
        unique: true
    },
    degree:{
        required: true,
        type: String,
    },
    areaOfStudy:{
        type: String,
    },
    startDate:dateSchema,
    endDate:dateSchema,
    description:{
        type: String
    }
},{_id: false});

module.exports = educationSchema;