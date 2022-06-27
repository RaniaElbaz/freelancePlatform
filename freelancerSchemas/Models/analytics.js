const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    earnings:{
        type: Number,
        default:0
    },
    jobs:{
        type: Number,
        default:0
    },
    hours:{
        type: Number,
        default:0
    },
    views:{
        type: Number,
        default:0
    },
    followers:{ 
        type: Number,
        default:0
    },
    following:{
        type: Number,
        default:0
    }
},{_id: false});

module.exports = analyticsSchema;