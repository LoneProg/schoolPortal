const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    score: { type: Number, required: true }
});

module.exports = mongoose.model('Grade', gradeSchema);

