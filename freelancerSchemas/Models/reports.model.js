const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const reportTypes = [
    'inappropraite',
    'spam',

]

//create schema object
const reportSchema = new mongoose.Schema({
    _id:{
        type: Number,
    },
    date:{
        type: Date,
        required: true
    },
    title:{
        type: String,
        enum: reportTypes,
        required: true
    },
    body:{
        type: string
    },
    category:{//?
        type: String,
    },
    reporter:{
        type: Number,
        required: true,
        // ref: ""
    },
    reported:{
        type: Number,
        required: true,
        // ref: ""
    },

}, { _id: false });

//mapping
reportSchema.plugin(AutoIncrement, {id: 'reportsId'});
mongoose.model("reports",reportSchema);