const express = require('express');
const router = express.Router();


// Replace with an environment variable in production

const getStudentById = (id) => students.find(student => student.id === id);

// Middleware to simulate authenticated user
router.use((req, res, next) => {
  req.studentId = 1; // Replace with authentication logic
  next();
});

// GET /profile: View their own profile
router.get('/profile', (req, res) => {
  const student = getStudentById(req.studentId);
  if (student) {
    res.status(200).json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// GET /grades: View grades
router.get('/grades', (req, res) => {
  const student = getStudentById(req.studentId);
  if (student) {
    res.status(200).json({ grades: student.grades });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// POST /assignments: Submit assignments
router.post('/assignments', (req, res) => {
  const { assignmentName, content } = req.body;

  if (!assignmentName || !content) {
    return res.status(400).json({ message: 'Assignment name and content are required' });
  }

  const student = getStudentById(req.studentId);
  if (student) {
    student.assignments.push({ assignmentName, content, submittedAt: new Date() });
    res.status(201).json({ message: 'Assignment submitted successfully' });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

module.exports = router;


