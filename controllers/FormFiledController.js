const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const FormData = require("../models/formFiledModel");

exports.createformFiled = catchAsync(async (req, res, next) => {
  const { name } = req.body; // Extract leaf category name and form fields
  console.log(name);
  const formData = new FormData({
    name,
  });

  // Save the new FormData document to the database
  const savedFormData = await formData.save();
  res.status(200).json({
    status: "Success",
    message: "form Filed created ",
    savedFormData,
  });
});

exports.addFormFileds = catchAsync(async (req, res, next) => {
  const { formFields } = req.body;
  const { slug } = req.params;
  const result = await FormData.findOne({ slug: slug });

  if (!result) {
    return res.status(404).json({ message: "Form not found" });
  }

  result.formFields.push(...formFields);

  // Save the updated form data
  await result.save();
  res.status(200).json({
    status: "Success",
    message: "form Filed created ",
    result,
  });
});

exports.getformfiledList = catchAsync(async (req, res, next) => {
  const result = await FormData.find();
  res.status(200).json({
    status: "Success",
    message: "get form filds",
    result,
  });
});
