const express = require("express");
const router = express.Router();
const companiesController = require("../controllers/companiesController");
const {
  logoImageMidelwear,
  galleryImageMidelwear,
} = require("../utils/multerUploadMiddleware");

// User Registration
router.post("/upload-logo", logoImageMidelwear, companiesController.uploadLogo);
router.patch(
  "/upload-gallery/:id",
  galleryImageMidelwear,
  companiesController.uploadGallery
);

router.patch(
  "/update-logo/:id",
  logoImageMidelwear,
  companiesController.updateLogo
);

module.exports = router;
