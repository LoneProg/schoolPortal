const express = require('express');
const router = express.Router();

// Mock Data (Replace with database integration as needed)
let students = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    grades: { math: 'A', science: 'B', history: 'A-' },
    assignments: [
      { id: 1, assignmentName: 'Math Homework', content: 'Exercise 1-10', grade: null },
    ],
  },
];

let announcements = [];

// GET /students: View and manage student profiles
router.get('/students', (req, res) => {
  res.status(200).json(students);
});

// POST /assignments: Post assignments
router.post('/assignments', (req, res) => {
  const { assignmentName, description } = req.body;

  if (!assignmentName || !description) {
    return res.status(400).json({ message: 'Assignment name and description are required' });
  }

  // Logic to post an assignment (here it's added to all students' assignment list)
  students.forEach(student => {
    student.assignments.push({
      id: student.assignments.length + 1,
      assignmentName,
      description,
      grade: null,
    });
  });

  res.status(201).json({ message: 'Assignment posted successfully' });
});

// POST /announcements: Post announcements
router.post('/announcements', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  announcements.push({ id: announcements.length + 1, title, content, date: new Date() });

  res.status(201).json({ message: 'Announcement posted successfully' });
});

// PUT /assignments/:id: Grade submitted assignment
router.put('/assignments/:id', (req, res) => {
  const assignmentId = parseInt(req.params.id, 10);
  const { studentId, grade } = req.body;

  if (!studentId || !grade) {
    return res.status(400).json({ message: 'Student ID and grade are required' });
  }

  const student = students.find(s => s.id === studentId);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  const assignment = student.assignments.find(a => a.id === assignmentId);
  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }

  assignment.grade = grade;

  res.status(200).json({ message: 'Assignment graded successfully', assignment });
});

module.exports = router;

// Example for studentController.js
exports.getProfile = (req, res) => { /* Logic here */ };
exports.getGrades = (req, res) => { /* Logic here */ };
exports.submitAssignment = (req, res) => { /* Logic here */ };
