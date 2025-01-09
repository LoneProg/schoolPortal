const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');

// Middleware to simulate authenticated user
router.use((req, res, next) => {
  req.studentId = req.user.id; // Replaced with authentication logic
  next();
});

// GET /profile: View their own profile
router.get('/profile/:id', async (req, res) => {
  try {
    const student = await User.findById(req.studentId);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /grades: View grades
router.get('/grades', async (req, res) => {
  try {
    const student = await User.findById(req.studentId);
    if (student) {
      res.status(200).json({ grades: student.grades });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /assignments: Submit assignments
router.post('/assignments', async (req, res) => {
  const { assignmentName, content } = req.body;

  if (!assignmentName || !content) {
    return res.status(400).json({ message: 'Assignment name and content are required' });
  }

  try {
    const student = await User.findById(req.studentId);
    if (student) {
      student.assignments.push({ assignmentName, content, submittedAt: new Date() });
      await student.save();
      res.status(201).json({ message: 'Assignment submitted successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;


