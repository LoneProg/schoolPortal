const express = require('express');
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Protect all routes with authMiddleware and roleMiddleware
router.use(authMiddleware);
router.use(roleMiddleware('teacher'));

// Teacher routes
router.get('/students', teacherController.getStudents);
router.post('/assignments', teacherController.postAssignment);
router.post('/announcements', teacherController.postAnnouncement);
router.put('/assignments/:id', teacherController.gradeAssignment);

module.exports = router;
