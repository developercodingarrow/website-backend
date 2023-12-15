const express = require("express");
const router = express.Router();
const TestController = require("../controllers/testController");

// User Registration
router.post("/create-data", TestController.createData);
router.get("/get-data", TestController.getDataList);
router.patch("/toggle-active", TestController.updateActiveStatus);

module.exports = router;
