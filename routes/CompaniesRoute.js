const express = require("express");
const router = express.Router();
const companiesController = require("../controllers/companiesController");
const {
  logoImageMidelwear,
  galleryImageMidelwear,
} = require("../utils/multerUploadMiddleware");

// User Registration
router.post("/upload-logo", logoImageMidelwear, companiesController.uploadLogo);
router.post(
  "/upload-gallery/:id",
  galleryImageMidelwear,
  companiesController.uploadGallery
);

router.patch(
  "/update-logo/:id",
  logoImageMidelwear,
  companiesController.updateLogo
);

router.get("/get-all-logo", companiesController.getAllLogo);
router.get("/get-single-logo/:_id", companiesController.getSingleLogo);
router.delete(
  "/delete-gallery-image/:_id",
  companiesController.deleteGalleryimage
);

module.exports = router;
