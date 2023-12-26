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

exports.uploadGallery = catchAsync(async (req, res, next) => {
  const galleryImages = req.files;
  const id = req.params.id;
  console.log(req.body);
  console.log(galleryImages);

  const images = galleryImages.map((file) => ({
    url: file.filename,
    altText: req.body.altText,
    descreption: req.body.descreption,
  }));

  const company = await Companies.findById(id);
  if (!company) {
    return res
      .status(404)
      .json({ status: "error", message: "Company not found" });
  }

  // Add new images to galleryPhotos array
  company.galleryPhotos.push(...images);

  const updatedCompany = await company.save();

  res.status(201).json({
    status: "success",
    data: {
      company: updatedCompany,
    },
  });
});

exports.getAllLogo = catchAsync(async (req, res, next) => {
  const data = await Companies.find();

  res.status(200).json({
    results: data.length,
    status: "Success",
    message: "get all logos",
    data,
  });
});

exports.getSingleLogo = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  console.log(_id);
  const data = await Companies.findById(_id);

  res.status(200).json({
    results: data.length,
    status: "Success",
    message: "get single deatils logos",
    result: data,
  });
});

exports.deleteGalleryimage = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const { imageId } = req.body;
  console.log(imageId);
  const data = await Companies.findById(_id);
  if (!data) {
    return next(new AppError("there is no data", 404));
  }
  // Filter out the image from the galleryPhotos array based on imageId
  data.galleryPhotos = data.galleryPhotos.filter(
    (photo) => photo._id.toString() !== imageId
  );

  await data.save();
  res.status(200).json({
    results: data.length,
    status: "Success",
    message: "Delette Image",
    result: data,
  });
});
