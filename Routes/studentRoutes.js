const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Protect all routes with authMiddleware and roleMiddleware
router.use(authMiddleware);
router.use(roleMiddleware('student'));

// Student routes
router.get('/profile', studentController.getProfile);
router.get('/grades', studentController.getGrades);
router.post('/assignments', studentController.submitAssignment);

module.exports = router;
