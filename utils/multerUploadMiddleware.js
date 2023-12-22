const multer = require("multer");
const path = require("path");

// Function to create Multer storage
const createMulterStorage = (destination, context) => {
  const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(destination));
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${context}-${Date.now()}-${file.originalname}`);
    },
  });
  return multerStorage;
};

// Function to create Multer upload middleware
const createMulterUpload = (
  storage,
  fieldName,
  isMultiple = true,
  maxCount = 1
) => {
  const upload = isMultiple
    ? multer({ storage: storage }).array(fieldName, maxCount)
    : multer({ storage: storage }).single(fieldName);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        console.error("Multer Error:", err); // Log any multer-related errors
        return res.status(400).send("File upload error");
      }
      next();
    });
  };
};

// For logo
const logoStorage = createMulterStorage(
  `${__dirname}/../../website-front-end/public/companies-logo`,
  "logo"
);

const logoUpload = createMulterUpload(logoStorage, "logo", true);

exports.logoImageMidelwear = logoUpload;

// For galleries
const galleryStorage = createMulterStorage(
  `${__dirname}/../../website-front-end/public/companies-gallery-images`,
  "logo"
);

const galleryUpload = createMulterUpload(
  galleryStorage,
  "galleryPhotos",
  true,
  10
);
exports.galleryImageMidelwear = galleryUpload;
