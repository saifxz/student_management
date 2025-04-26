const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  instructor: { type: String },
  credits: { type: Number }
});

// Create text index on courseName
courseSchema.index({ courseName: 'text' });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
