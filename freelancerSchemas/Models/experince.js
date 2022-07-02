const mongoose = require('mongoose');

const dateSchema = require('./dateSchema');
const locationSchema = require('./locations');

const experinceSchema = new mongoose.Schema({
    company:{
        required: true,
        type: String,
    },
    title:{
        required: true,
        type: String,
    },
    location:locationSchema,
    startDate: dateSchema,
    endDate: dateSchema,
    description:{
        type: String,
        minLength: 100,
        maxLength: 1000,
    }
},{_id: false });

module.exports = experinceSchema;