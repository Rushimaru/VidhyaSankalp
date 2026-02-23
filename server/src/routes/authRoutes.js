 // src/routes/authRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'auth route working' });
});

module.exports = router; // ← this line is critical, don't forget it