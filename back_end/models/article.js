const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this is the structure for an article in the inventory
const ArticleSchema = new Schema(
  {
    // serves as the barcode
    id: {
      type: Number,
      unique: true,
      required: [true, "Id is required"]
    },
    name: {
      type: String,
      default: '',
      trim: true,
      required: [true, "Name is required"]
    },
    quantity: {
      type: Number,
      default: 0.0,
      required: [true, "quantity is required"]
    },
    buyPrice: {
      type: Number,
      default: 0.0,
      required: [true, "buyPrice is required"]
    },
    weight: {
      default: 0.0,
      type: Number
    }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Article", ArticleSchema);
