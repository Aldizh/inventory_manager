const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// geo location schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    id: {
      type: Number,
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
    sellPrice: {
      type: Number,
      default: 0.0,
      required: [true, "sellPrice is required"]
    },
    category: {
      type: String,
      default: '',
      trim: true,
      required: [true, "Category is required"]
    },
    weight: {
      default: 0.0,
      type: Number
    },
    available: {
      type: Boolean,
      default: false
    },
    geometry: GeoSchema
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);
