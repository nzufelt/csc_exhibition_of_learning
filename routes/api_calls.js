// api calls for data from the database

const express = require('express');
const exhibitionController = require('../controllers/exhibition_table_queries');
const userController = require('../controllers/user_table_queries');
const skillController = require('../controllers/skill_table_queries');
const courseController = require('../controllers/course_table_queries');

const router = express.Router();

module.exports = router;

// router.get("/api/skills", skillController.getAllSkills);
// router.get("/api/course_names", courseController.getUniqueCourseNames);
// router.get("/api/course_id/:course_name", courseController.getCourseIdFromCourseName);

// router.get("/api/exhibitions", exhibitionController.getAllExhibitions);
// router.get("api/exhibitions/homepage", exhibitionController.getExhibitionsHomePage);

// router.get("/api/users", userController.getAllUsers);
// router.get("/api/academic_years", courseController.getAcademicYears);

// router.get("/api/search/:student_id/:course_id/:teacher_id/:skill_ids/:academic_year/:term", exhibitionController.searchExhibitions);
