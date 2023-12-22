const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Companies = require("../models/companyModel");

exports.uploadLogo = catchAsync(async (req, res, next) => {
  const image = req.files.filename;

  const newCompany = new Companies({
    logo: [
      {
        url: image,
        altText: "test-image",
      },
    ],
  });

  // Save the new company to the database
  const savedCompany = await newCompany.save();

  res.status(201).json({
    status: "success",
    data: {
      company: savedCompany,
    },
  });
});

exports.uploadGallery = catchAsync(async (req, res, next) => {
  const galleryImages = req.files;
  const id = req.params.id;
  const images = galleryImages.map((file) => ({
    url: file.filename,
    altText: req.body.altText,
  }));

  const company = await Companies.findById(id);
  if (!company) {
    return res
      .status(404)
      .json({ status: "error", message: "Company not found" });
  }
  // If galleryPhotos array doesn't exist in the company document, create it with the images
  if (!company.galleryPhotos) {
    company.galleryPhotos = images;
  } else {
    // If galleryPhotos array exists, push the new images into it
    company.galleryPhotos.push(...images);
  }

  const updatedCompany = await company.save();

  res.status(201).json({
    status: "success",
    data: {
      company: updatedCompany,
    },
  });
});

exports.updateLogo = catchAsync(async (req, res, next) => {
  const image = req.files.filename;

  const id = req.params.id;

  const data = await Companies.findByIdAndUpdate(
    id,
    {
      logo: {
        url: image,
        altText: "update-new-image",
      },
    },
    { new: true }
  );

  return res.status(200).json({
    status: "Success",
    message: "Project Cover image Update Succesfully",
    data,
  });
});
