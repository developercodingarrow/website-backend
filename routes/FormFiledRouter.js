const express = require("express");
const router = express.Router();
const FormFiledController = require("../controllers/FormFiledController");

// User Registration
router.post("/create-new-form", FormFiledController.createformFiled);
router.get("/get-form-filed", FormFiledController.getformfiledList);
router.patch("/add-form-fileds/:slug", FormFiledController.addFormFileds);

module.exports = router;
