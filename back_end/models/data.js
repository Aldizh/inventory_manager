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
      required: [true, "Name field is required"]
    },
    name: {
      type: String
    },
    weight: {
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
