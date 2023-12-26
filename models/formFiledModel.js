const mongoose = require("mongoose");

const formFieldSchema = new mongoose.Schema({
  label: { type: String },
  name: { type: String },
  type: { type: String }, // Input type: CheckBox, Radio, Text, etc.
  options: { type: [String] }, // Options for CheckBox, Radio, etc.
  // Add more specifications as needed based on different input types
});

const formDataSchema = new mongoose.Schema({
  name: { type: String }, // Leaf category name: "Mobile," "Mobile Cover," etc.
  formFields: { type: [formFieldSchema] }, // Specifications for form fields
});

const FormData = mongoose.model("FormData", formDataSchema);

module.exports = FormData;
