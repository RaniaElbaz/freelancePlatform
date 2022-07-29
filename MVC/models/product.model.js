const mongoose = require("mongoose");

const { Schema } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = new Schema(
  {
    _id: {
      type: Number,
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
    
    ownerId: {
      type: Number,
      required: true,
      refPath: "ownerModel", //refPath
    },
    ownerModel: {
      type: String,
      required: true,
      emun: ["freelancers", "teams"],
    },
    
    buyerId: {
      type: [Number],
      refPath: "buyerModel",
    },
    buyerModel: {
        type: String,
        enum: ["companies", "clients"],
    },
    
    skills: {
      type: [Number],
      ref: "skills",
    },
  },
  { _id: false, timestamps: true }
);

productSchema.plugin(AutoIncrement, { id: "productId" });
mongoose.model("products", productSchema);
