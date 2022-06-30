const  mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const skillSchema = new mongoose.Schema({
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
    categories:[{
        type:Number,
        // uniqueItems:true,//🔴
        ref:'categories'
    }],
});

// module.exports = skillSchema;

schema.plugin(AutoIncrement,{id:'skillId'})

mongoose.model("skills",skillSchema);