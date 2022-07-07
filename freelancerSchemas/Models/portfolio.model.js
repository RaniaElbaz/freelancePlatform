const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    portfolioTitle:{
        required: true,
        type: String,
    },
    portfolioRelatedJob:{
        type: Number,
        ref: "projects"
    },
    portfolioCompletionDate:{
        required: true,
        type: Date,
    },
    portfolioFiles:{
        required: true,
        type: [String]
    },
    portfolioSkills:{
        type: [Number],
        ref:"skills",
        validate: {
            validator: function(value) {
              const duplicated = value.filter((item, index) => value.indexOf(item) !== index)
              return !Boolean(duplicated.length);
            },
            message: props => `${props.value} duplicated skill value`
        },
    },
    portfolioUrl:{
        type: String
    },
    portfolioDescription:{
        type: String,
        required: true,
        minLength: 100,
        maxLength: 1000
    }
},{_id: false });

module.exports = portfolioSchema;