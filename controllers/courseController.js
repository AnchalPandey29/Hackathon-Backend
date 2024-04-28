const Course = require("../models/Course");
const uuid = require("uuid");
// Create new course
exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, deadlineDate, image_link, department } =
      req.body;
    // Generate a unique course_id
    const course_id = uuid.v4();
    // Create new course object
    const course = new Course({
      course_id,
      title,
      description,
      deadlineDate,
      image_link,
      department,
    });
    await course.save();
    res.status(201).json({ message: "Course added successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete course by ID
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findOneAndDelete({ course_id: req.params.id });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Get all courses
exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    next(err);
  }
};
