const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    testimonialRating:{
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    testimonialIssued:{
        type: Date,
        required: true
    },
    testimonialComment:{
        required: true,
        type: String,
    },
    testimonialProject:{
        type: Number,
        ref: "projects",
        required: true
    }
},{_id: false });

module.exports = testimonialSchema;