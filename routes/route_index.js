// index file for website pages

const express = require('express');

const exhibitionController = require('../controllers/exhibition_table_queries');
const userController = require('../controllers/user_table_queries');
const skillController = require('../controllers/skill_table_queries');
const courseController = require('../controllers/course_table_queries');
const adminController = require('../controllers/admin_table_queries');

const bcrypt = require('bcrypt')
const checkAuthentication = require('../authentication')
const initializePassport = require('../passport-config')
const passport = require('passport')

/* NEED TO CREATE FUNCTIONS: GetUserByEmail and GetUserById => CHANGED TO "GetAdminByEmail" AND "GetAdminById" */
initializePassport(
    passport,
    email => adminController.GetAdminByEmail(email),
    id => adminController.GetAdminById(id),
)

const middleware = require('../middleware')

const router = express.Router();

module.exports = router;

// test routers for submitting course information -------------
router.get('/course-form', async function(req, res){
    res.render("submit_course");
});

router.post('/submit-course', async function(req, res){
    const course_number = req.body.course_number;
    const course_name = req.body.course_name;
    const course_description = req.body.course_description;
    const course_level = req.body.course_level;

    await courseController.createCourse(course_number, course_name, course_description, course_level);

    res.send("Course Submitted Successfully!" + course_number + course_name + course_description + course_level);
});
// --------------------------

router.get('/', async function(req, res){
    exhibitions = await exhibitionController.getExhibitionsHomePageJSON();
    skills = await skillController.getAllSkillsJSON();
    courses = await courseController.getAllCoursesJSON();
    students = await userController.getAllUsersJSON();
    teachers = await adminController.getAllAdminsJSON();

    res.render("home", 
       {exhibitions,
        skills,
        courses,
        students,
        teachers
       })
 });
 
 // EXAMPLE URL FOR TESTING: /search?students=[101,102]&teachers=[103,104]&skills=[1,2]&courses=[10001,10002]&years=[2022,2023]&terms=[1,2,3]&levels=["Advanced"]
 router.get('/search', async (req, res)=>{
    var search_parameters = await middleware.getParametersSearchPage(req.query.students, req.query.teachers, req.query.skills, req.query.courses, req.query.years, req.query.terms, req.query.levels);
    var exhibitions = await exhibitionController.getExhibitionsSearchResults(search_parameters);
    var tag_display = await exhibitionController.getTagDisplay(search_parameters);
 
    console.log(tag_display)
    res.render("search-results", 
        {exhibitions,
            tag_display
        })
 });
 
router.get("/cs-at-andover", async function (req, res) {
    courses = await courseController.getAllCoursesJSON();

    res.render("csAtAndover",
    {courses
       });
});

router.get("/about-us", function (req, res) {
    res.render("about");
});

router.get("/admin-login", checkAuthentication.checkNotAuthenticated, function (req, res) {
    res.render("admin-login");
});

router.post('/admin-login', checkAuthentication.checkNotAuthenticated, passport.authenticate('local', {
    //options from passport.js
    successRedirect: "/admin-home",
    failureRedirect: '/admin-login',
    failureFlash: true
}))

router.get("/admin-home", checkAuthentication.checkAuthenticated, function (req, res) {
    res.render("admin-home");
});

router.get('/health', async(req, res) => {
    res.send("hello world!");
});