const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/schoolPortal', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the student schema
const studentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  grades: {
    math: String,
    science: String,
    history: String,
  },
  assignments: [
    {
      id: Number,
      assignmentName: String,
      content: String,
      grade: String,
    },
  ],
});

// Create the student model
const Student = mongoose.model('Student', studentSchema);

// Fetch students from the database
Student.find({}, (err, students) => {
  if (err) {
    console.error(err);
  } else {
    console.log(students);
  }
});