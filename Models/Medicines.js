const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  expiry: {
    type: String,
    required: true,
  },
  qty: {
    type: String,
    required: true,
  },
  packing: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  schema: {
    type: String,
    required: true,
  },
  mrp: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  hsn: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("medicine", UserSchema);
