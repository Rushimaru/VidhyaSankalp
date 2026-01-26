const express = require("express");
const router = express.Router();

const testController = require("../controllers/test.controller");
const authController = require("../controllers/auth.controller");

// Test
router.get("/test", testController.test);

// Auth
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

module.exports = router;

const { protect } = require("../middlewares/auth.middleware");
