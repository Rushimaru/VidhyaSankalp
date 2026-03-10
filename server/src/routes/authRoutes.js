const express = require('express');
const { loginUser, registerUser, verifyOtp } = require('../controllers/authController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp); // ✅ new

module.exports = router;