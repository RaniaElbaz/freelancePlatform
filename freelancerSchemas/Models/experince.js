const mongoose = require('mongoose');

const dateSchema = require('./dateSchema');
const locationSchema = require('./locations');

const experinceSchema = new mongoose.Schema({
    company:{
        required: true,
        type: Number,
    },
    title:{
        required: true,
        type: Number,
    },
    location:locationSchema,
    startDate: dateSchema,
    endDate: dateSchema,
    description:{
        type: String,
    }
},{_id: false });

module.exports = experinceSchema;