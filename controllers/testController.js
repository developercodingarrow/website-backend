const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Test = require("../models/testModel");

exports.createData = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const newData = await new Test({
    name,
  });

  const saveData = await newData.save();

  res.status(200).json({
    status: "Success",
    saveData,
  });
});

exports.getDataList = catchAsync(async (req, res, next) => {
  const result = await Test.find();

  res.status(200).json({
    status: "Success",
    total: result.length,
    result,
  });
});

exports.updateActiveStatus = catchAsync(async (req, res, next) => {
  const { _id } = req.body;
  const data = await Test.findById(_id);
  data.active = !data.active;
  await data.save();
  res.status(200).json({
    status: "Success",
    result: data,
  });
});
