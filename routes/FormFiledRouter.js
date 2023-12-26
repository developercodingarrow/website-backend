const express = require("express");
const router = express.Router();
const FormFiledController = require("../controllers/FormFiledController");

// User Registration
router.post("/create-new-form", FormFiledController.createformFiled);

module.exports = router;
