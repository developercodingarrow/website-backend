const express = require("express");
const router = express.Router();
const FormFiledController = require("../controllers/FormFiledController");

// User Registration
router.post("/create-new-form", FormFiledController.createformFiled);
router.get("/get-form-filed", FormFiledController.getformfiledList);
router.delete("/delete-form-filed", FormFiledController.deleteFormField);
router.patch("/add-form-fileds/:slug", FormFiledController.addFormFileds);
router.get("/get-single-form/:slug", FormFiledController.getSingleFormFiled);
module.exports = router;
