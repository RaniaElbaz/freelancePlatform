const mongoose = require('mongoose');

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const dateSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
    },
    month:{
        type: String,
        enum: months
    },
},{_id: false});

module.exports = dateSchema;