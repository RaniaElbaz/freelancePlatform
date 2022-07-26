const mongoose = require("mongoose");

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
