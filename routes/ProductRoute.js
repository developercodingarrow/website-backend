const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
// User Registration
router.post("/create-new-product", ProductController.createProduct);
router.get(
  "/get-product-by-categories/:category",
  ProductController.getProductByCategories
);
module.exports = router;
