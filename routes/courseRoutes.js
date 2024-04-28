const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// POST create course
router.post("/", courseController.createCourse);

// DELETE delete course by ID
router.delete("/:id", courseController.deleteCourse);

// GET get all courses
router.get("/", courseController.getAllCourses);

module.exports = router;
