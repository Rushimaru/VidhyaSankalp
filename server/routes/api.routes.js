const express = require("express");
const router = express.Router();
const testController = require("../controllers/test.controller");

// Test API
router.get("/test", testController.test);

module.exports = router;
