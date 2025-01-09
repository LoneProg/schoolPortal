const express = require('express');
const studentController = require('../Controller/studentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Protect all routes with authMiddleware and roleMiddleware
router.use(authMiddleware);
router.use(roleMiddleware('student'));

// Student routes
router.get('/profile', studentController.getProfile);
router.get('/grades', studentController.getGrades);
router.post('/assignments', studentController.submitAssignment);

module.exports = router;
