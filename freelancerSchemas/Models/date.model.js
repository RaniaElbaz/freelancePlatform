const mongoose = require('mongoose');

const { months } = require('../data/enums');

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