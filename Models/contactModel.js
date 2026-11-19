const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  email: String,
  name: String,
  mobile: String,
  message: String
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);