const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const Assignment = require('../model/assignment');
const Announcement = require('../model/announcement');

// GET /students: View and manage student profiles
router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'Student' });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /assignments: Post assignments
router.post('/assignments', async (req, res) => {
  const { assignmentName, description } = req.body;

  if (!assignmentName || !description) {
    return res.status(400).json({ message: 'Assignment name and description are required' });
  }

  try {
    const assignment = new Assignment({ assignmentName, description, teacherId: req.user.id });
    await assignment.save();
    res.status(201).json({ message: 'Assignment posted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /announcements: Post announcements
router.post('/announcements', async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const announcement = new Announcement({ title, content, date: new Date() });
    await announcement.save();
    res.status(201).json({ message: 'Announcement posted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /assignments/:id: Grade submitted assignment
router.put('/assignments/:id', async (req, res) => {
  const assignmentId = req.params.id;
  const { studentId, grade } = req.body;

  if (!studentId || !grade) {
    return res.status(400).json({ message: 'Student ID and grade are required' });
  }

  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    assignment.grade = grade;
    await assignment.save();

    res.status(200).json({ message: 'Assignment graded successfully', assignment });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
