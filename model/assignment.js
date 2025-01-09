const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    grade: { type: Number }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
