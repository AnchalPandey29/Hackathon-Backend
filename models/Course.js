const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  course_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dateIntroduced: { type: Date, default: Date.now },
  deadlineDate: { type: Date, required: true },
  image_link: { type: String },
  department: { type: String, required: true },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
