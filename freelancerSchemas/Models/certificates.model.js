const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    certificateOrganization:{
        required: true,
        type: String,
    },
    certificateTitle:{
        required: true,
        type: String,
    },
    certificateIssued:{
        required: true,
        type: Date,
    },
    certificateDescription:{
        type: String,
    },
    certificateUrl:{
        type: String,
    },
    certificateId:{
        type: String
    },
    certificateExpirationDate:{
        type: Date
    }
},{_id: false });

module.exports = certificateSchema;