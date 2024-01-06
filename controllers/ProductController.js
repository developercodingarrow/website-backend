const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Product = require("../models/productModel");

exports.createProduct = catchAsync(async (req, res, next) => {
  const { title, category, commonField, specificFields } = req.body;

  const newProduct = new Product({
    title,
    category,
    commonField,
    specificFields,
  });

  const data = await newProduct.save();

  res.status(200).json({
    status: "Success",
    result: data,
  });
});

function buildFilter(queryObj) {
  let filter = {};

  for (const key in queryObj) {
    if (Object.hasOwnProperty.call(queryObj, key)) {
      const value = queryObj[key];
      if (Array.isArray(value)) {
        filter[`specificFields.${key}`] = { $in: value };
      } else if (typeof value === "object") {
        const nestedFilter = {};
        for (const operator in value) {
          if (Object.hasOwnProperty.call(value, operator)) {
            const nestedValue = parseFloat(value[operator]);
            if (!isNaN(nestedValue)) {
              nestedFilter[`$${operator}`] = nestedValue;
            }
          }
        }
        filter[`specificFields.${key}`] = nestedFilter;
      } else {
        filter[`specificFields.${key}`] = value;
      }
    }
  }

  return filter;
}

const buildSort = (sort, order) => {
  if (!sort) return "";

  const sortFields = sort.split(",").map((field) => {
    const sortField = `specificFields.${field}`;
    return order === "desc" ? `-${sortField}` : sortField;
  });

  return sortFields.join(" ");
};

const buildFieldSelection = (fieldParams) => {
  const defaultFields = { title: 1, category: 1 };
  const selectedFields = fieldParams.reduce((fields, key) => {
    fields[`specificFields.${key}`] = 1;
    return fields;
  }, {});

  return { ...selectedFields, ...defaultFields };
};

exports.getProductByCategories = catchAsync(async (req, res, next) => {
  const { category } = req.params;
  const queryObj = { ...req.query };
  console.log(queryObj);
  const excluedeFiled = ["page", "sort", "limit", "filed", "order"];
  excluedeFiled.forEach((el) => delete queryObj[el]);
  let filter = { category };
  console.log(queryObj);
  filter = { ...filter, ...buildFilter(queryObj) };

  let query = Product.find(filter);
  // Sorting
  const sortBy = buildSort(req.query.sort, req.query.order);
  if (sortBy) {
    query = query.sort(sortBy);
  }

  const spacifyfieldParams = ["bedroom"];
  const selectedFields = buildFieldSelection(spacifyfieldParams);
  query = query.select(selectedFields);

  const result = await query;

  res.status(200).json({
    total: result.length,
    status: "Success",
    result: result,
  });
});
