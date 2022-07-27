const mongoose = require("mongoose");

<<<<<<< HEAD
const { Schema, Types } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = new Schema(
  {
    _id: {
      type: Number,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "ownerModel", //refPath
    },
    ownerModel: {
      type: String,
      required: true,
      emun: ["freelancers", "teams"],
    },

    productName: {
      type: String,
      required: true,
    },

    views: {
      type: Number,
    },

    timesOfDownload: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
      minlength: 100,
    },
    price: {
      type: Number,
      required: true,
    },
    buyerId: {
      type: mongoose.Types.ObjectId,
      refPath: "buyerModel",
    },
    buyerModel: {
      type: String,

      enum: ["company", "clients"],
    },

    skills: {
      type: [{ type: mongoose.Types.ObjectId }],
      ref: "skills",
    },
  },
  { _id: false, timestamps: true }
);

productSchema.plugin(AutoIncrement, { id: "productId" });
mongoose.model("products", productSchema);
=======
const { Schema,Types } =require("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose);



const productSchema = new Schema({
    _id:{
        type:Number
    },
    ownerId:{
        type: Schema.Types.ObjectId,
        required: true,
        refPath:"ownerModel"   //refPath      
     },
     ownerModel:{
        type:String ,
        required:true,
        emun:["freelancer","team"]
     } ,
  
    productName: {
        type: String,
        required: true,        
    },
   
    views: {
        type: Number,
    } ,
  
    timesOfDownload: {
        type: Number,
    } ,
    description: {
        type: String,
        required: true,
        minlength:100
    },
    price: {
        type: Number,
        required: true,
    } ,
    buyerId: {
        type: mongoose.Types.ObjectId,      
        refPath:"buyerModel"
    } ,
    buyerModel:{
        type:String,
       
        enum:["company","clint"]
    },

    skills: {
        type: [{type:mongoose.Types.ObjectId}],
        ref:"skills"
    } ,
  

},{_id:false,timestamps:true})

productSchema.plugin(AutoIncrement,{id:"productId"});
mongoose.model("products",productSchema)
>>>>>>> e9762852921fbadd5ca7a3fdcda84454884c19db
