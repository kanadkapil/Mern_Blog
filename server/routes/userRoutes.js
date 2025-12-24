const express = require('express');
const router = express.Router();
const { updateProfile, deactivateAccount, getPublicProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route
router.get('/:username', getPublicProfile);

// Protected routes
router.put('/profile', authMiddleware, updateProfile);
router.post('/deactivate', authMiddleware, deactivateAccount);

module.exports = router;
