const  mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const testimonialSchema = require("./testimonial");
const analyticSchema = require("./analytic");

const teamSchema = new mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        unique:true,
        required:true,
        minlength:3,
        maxlength:15
    },
    description:{
        type:String,
        required:true,
        minlength:100,
        maxlength:1000
    },
    hourlyRate:{
        type:Number,
        required:true,
        min:10,
        max:100
    },
    logo:{
        type:String
    },
    members:[{
        type:Number,
        // minItems:2,//🔴
        // uniqueItems:true,//🔴
        // required:true,//🔴
        ref:'freelancers'
    }],

/******* user does not enter these data *******///🟡
    testimonial: [testimonialSchema],//array options🔴
    analytic: analyticSchema,
    wallet:{
        type:Number,
        default:0
    },
    isVerified:{
        type:Boolean,
        default:false
    }
});

// module.exports = teamSchema;

schema.plugin(AutoIncrement,{id:'studentId'});

mongoose.model("teams",teamSchema);