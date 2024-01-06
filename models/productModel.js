const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },

  specificFields: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
