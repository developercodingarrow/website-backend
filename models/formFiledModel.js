const mongoose = require("mongoose");
const slugify = require("slugify");
const formFieldSchema = new mongoose.Schema({
  label: { type: String },
  name: { type: String },
  type: { type: String }, // Input type: CheckBox, Radio, Text, etc.
  placeholder: { type: String },
  options: { type: [String] }, // Options for CheckBox, Radio, etc.
});

const formDataSchema = new mongoose.Schema({
  name: { type: String }, // Leaf category name: "Mobile," "Mobile Cover," etc.
  slug: {
    type: String,
    require: [true, "slug didn't work"],
    unique: true,
  },
  formFields: { type: [formFieldSchema] }, // Specifications for form fields
});

// slug the pormotional page Title
formDataSchema.pre("save", function (next) {
  this.slug = slugify(this.name, {
    lower: false,
  });
  next();
});

const FormData = mongoose.model("FormData", formDataSchema);

module.exports = FormData;
