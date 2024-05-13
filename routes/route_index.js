// index file for website pages

const express = require('express');
const exhibitionController = require('../controllers/exhibition_table_queries');
const userController = require('../controllers/user_table_queries');
const skillController = require('../controllers/skill_table_queries');
const courseController = require('../controllers/course_table_queries');

const middleware = require('../middleware')

const router = express.Router();

module.exports = router;

router.get('/', async function(req, res){
    exhibitions = await exhibitionController.getExhibitionsHomePageJSON();
    res.render("home", 
       {exhibitions
       })
 });
 
 // EXAMPLE URL FOR TESTING: /search?students=[101,102]&teachers=[103,104]&skills=[1,2]&courses=[10001,10002]&year=[2022,2023]&term=[1,2,3]&level=["Advanced"]
 router.get('/search', async (req, res)=>{
    var search_parameters = await middleware.getParametersSearchPage(req.query.students, req.query.teachers, req.query.skills, req.query.courses, req.query.year, req.query.term, req.query.level)
 
   exhibitions = await exhibitionController.getExhibitionsSearchResults(search_parameters);
 
   res.render("search-results", 
        {exhibitions
        }) 
   // also send: is this a student is sending this to colleges page or not? --> in which case send bio
   // if not user page, send all other bios (for skills, courses, etc)
   // THIS IS ASSUMING NO PRESENTABLE MODE, SEARCH RESULTS JUST IS PRESENTABLE MODE
 
   //res.send(search_parameters)
   //res.send(exhibitions)
 });
 
router.get("/cs_at_andover", function (req, res) {
    res.render("csAtAndover");
});

router.get("/about_us", function (req, res) {
    res.render("about");
});

router.get("/admin-login", function (req, res) {
    res.render("admin-login");
});

router.get("/admin-home", function (req, res) {
    res.render("admin-home");
});

router.get('/health', async(req, res) => {
    res.send("hello world!");
});