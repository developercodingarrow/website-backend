const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Companies = require("../models/companyModel");

exports.uploadLogo = catchAsync(async (req, res, next) => {
  console.log(req);
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
