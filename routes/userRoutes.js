const express = require('express');
const { getUserDetails, updateUserDetails } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', protect, getUserDetails);
router.put('/profile', protect, updateUserDetails);

module.exports = router;