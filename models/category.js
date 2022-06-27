const  mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const categorySchema = new mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        unique:true,
        required:true,
        minlength:3,
        maxlength:20
    },
    image:{
        type:String
    },
    skills:[{
        type:Number,
        // uniqueItems:true,//🔴
        ref:'skills'
    }],
});

// module.exports = categorySchema;

schema.plugin(AutoIncrement,{id:'categoryId'});

mongoose.model("categories",categorySchema);