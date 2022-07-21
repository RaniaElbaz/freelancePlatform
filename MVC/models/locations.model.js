const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    postalCode:{
        type: Number
    },
    city:{
        type: String
    },
    address:{
        type: String
    },
    state:{
        type: String
    }
},{_id: false });

module.exports = locationSchema;