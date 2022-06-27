const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    projectTitle:{
        required: true,
        type: Number,
    },
    relatedJob:{
        type: Number,
    },
    completionDate:{
        required: true,
        type: Date,
    },
    files:[{
        required: true,
        type: String
    }],
    skills:[{
        type: Number,
        ref:"skills"
    }],
    URL:{
        type: String
    },
    description:{
        type: String,
        required: true
    }

},{_id: false });

module.exports = portfolioSchema;