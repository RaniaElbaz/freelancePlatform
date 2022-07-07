const mongoose = require('mongoose');

const dateSchema = require('./date.model');
const locationSchema = require('./locations.model');

const experinceSchema = new mongoose.Schema({
    experinceCompany:{
        required: true,
        type: String,
    },
    experinceTitle:{
        required: true,
        type: String,
    },
    experinceLocation:locationSchema,
    startDate: Date,
    endDate: Date,
    experinceDescription:{
        type: String,
        minLength: 100,
        maxLength: 1000,
    }
},{_id: false });

module.exports = experinceSchema;