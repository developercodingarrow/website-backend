const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const FormData = require("../models/formFiledModel");

exports.createformFiled = catchAsync(async (req, res, next) => {
  const { name, formFields } = req.body; // Extract leaf category name and form fields
  console.log(name, formFields);
  const formData = new FormData({
    name,
    formFields,
  });

  // Save the new FormData document to the database
  const savedFormData = await formData.save();
  res.status(200).json({
    status: "Success",
    message: "form Filed created ",
    savedFormData,
  });
});
