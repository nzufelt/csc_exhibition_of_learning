// index file for website pages
const passport = require('passport')
const express = require('express');

const exhibitionController = require('../controllers/exhibition_table_queries');
const userController = require('../controllers/user_table_queries');
const skillController = require('../controllers/skill_table_queries');
const courseController = require('../controllers/course_table_queries');
const adminController = require('../controllers/admin_table_queries');

const bcrypt = require('bcrypt')
const checkAuthentication = require('../authentication')
const initializePassport = require('../passport-config')

//for testing
// const users = []
// users.push({
//             admin_id: 103,
//             email: 'nzufelt@andover.edu',
//             name: "Nick Zufelt",
//             password: '$2b$10$rZa45zzzGkHATzK17MIAeeZvWFBImCTRVwgEajhU9vl/DsAEMwKEu',
//             bio: "I love to teach..."
//             })

initializePassport(
    passport,
    // email => users.find(user => user.email === email),
    // admin_id => users.find(user => user.admin_id === admin_id)
    email => adminController.GetAdminByEmail(email),
    admin_id => adminController.GetAdminById(admin_id)
)

const middleware = require('../middleware')

const router = express.Router();

module.exports = router;

// FOR TESTING OF EOL TO DATABASE PROCESS
router.get("/testing", async(req, res) => {
     EoLs = [
         {
             Email: 'tmarnoto24@andover.edu',
             first_Name: 'Tristan',
             last_Name: 'Marnoto',
             graduation_year: '2024',
             course: 'CSC402 - Web Dev ',
             description: 'My EoL talks about the two skills that I have learned in Game Development, both Writing Code and Speaking in Translations. In this course, rather than having step-by-step instructions on how to code, we got much more experience with developed code. Watching videos, doing code alongs, and using ChatGPT to explain code, all contributed towards my learning.',
             bio_query: false,
             student_bio: 'My name is Tristan Marnoto, and I have never had any experience with computer science or coding before this course. I signed up for this course because I was hoping to get a taste of computer science before college. While at the beginning I struggled to understand code and oftentimes found writing code impossible, I have become much more confident as the term has progressed. I would certainly recommend a course such as this one to anyone interested in computer science!',
             skill1: 'Refactoring Code ',
             skill2: 'Speaking in Translations ',
             embed_code: '<iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/1188822/sp/118882200/embedIframeJs/uiconf_id/25697092/partner_id/1188822?iframeembed=true&playerId=kaltura_player&entry_id=1_6ms5mb1m&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[hotspots.plugin]=1&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_go8h4eia" width="400" height="285" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-downloads allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Tristan Marnoto Exhibition of Learning"></iframe>',
             homepage_query: true,
             teacher_email: 'nzufelt@andover.edu',
             academic_year: 2024,
             term: 'Spring',
         }
     ]
     
     if (EoLs != -99) {
         await middleware.transferEoLsToDatabase(EoLs);
 
         // don't redirect but maybe display something like a "everything submitted" popup?
         res.send(EoLs);
     } else {
         console.log("uploading did not work");
     }
 })

router.get('/', async function(req, res){
    exhibitions = await exhibitionController.getExhibitionsHomePageJSON();
    skills = await skillController.getAllSkillsJSON();
    courses = await courseController.getAllCoursesJSON();
    students = await userController.getAllUsersJSON();
    teachers = await adminController.getAllAdminsJSON();
    console.log(exhibitions)

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

// POSTs FOR ADMIN CREATING/EDITING

// CREATING ------

// COURSES
router.get('/create-course-form', async function(req, res){
    res.render("admin_creation_forms/create_course_form");
});

router.post('/create-course', async function(req, res){
    const course_number = req.body.course_number;
    const course_name = req.body.course_name;
    const course_description = req.body.course_description;
    const course_level = req.body.course_level;

    await courseController.createCourse(course_number, course_name, course_description, course_level);

    res.send("Course Submitted Successfully!" + course_number + course_name + course_description + course_level);
});

// SKILLS
router.get('/create-skill-form', async function(req, res){
    res.render("admin_creation_forms/create_skill_form");
});

router.post('/create-skill', async function(req, res){
    const skill_name = req.body.skill_name;
    const skill_description = req.body.skill_description;
    const throughline = req.body.throughline;

    await skillController.createSkill(skill_name, skill_description, throughline);

    res.send("Skill Submitted Successfully! (" + skill_name + skill_description + throughline + ")");
});

// ADMINS
router.get('/create-admin-form', async function(req, res){
    res.render("admin_creation_forms/create_admin_form");
});

router.post('/create-admin', async function(req, res){
    const admin_id = req.body.admin_id;
    const email = req.body.email;
    const password_unencrypted = req.body.password;
    const password_encrypted = await bcrypt.hash(password_unencrypted, 10);
    const name = req.body.name;
    const bio = req.body.bio;

    await adminController.createAdmin(email, password_encrypted, name, bio);

    res.send("Admin Created Successfully!", email, password_encrypted, name, bio);
});
// ----------------

// EDITING --------------
// COURSES
router.get('/edit-course-form', async function(req, res){
    // PULL THE DATA OR RECEIVE THE DATA HERE (this will likely be subheader in another form so it's all good)
    const exampleData = {
        course_id : "10001",
        course_number : "CSC501",
        course_name : "Machine Learning",
        course_description : "In this course ...",
        course_level : "Advanced"
    }
    res.render("admin_edit_forms/edit_course_form", 
    {
        course : exampleData
    });
});

router.post('/edit-course', async function(req, res){
    const course_number = req.body.course_number;
    const course_name = req.body.course_name;
    const course_description = req.body.course_description;
    const course_level = req.body.course_level;
    const course_id = req.body.course_id;

    await courseController.editCourse(course_id, course_number, course_name, course_description, course_level);

    res.send("Course Edited Successfully!" + course_id + course_number + course_name + course_description + course_level);
});

// SKILLS
router.get('/edit-skill-form', async function(req, res){
    const exampleData = {
        skill_id : "102",
        skill_name : "Refactoring Code",
        skill_description : "This skill ...",
        throughline : "Working With Code"
    }

    res.render("admin_edit_forms/edit_skill_form", {
        skill : exampleData
    });
});

router.post('/edit-skill', async function(req, res){
    const skill_id = req.body.skill_id;
    const skill_name = req.body.skill_name;
    const skill_description = req.body.skill_description;
    const throughline = req.body.throughline;

    console.log(skill_id + skill_name + skill_description + throughline)

    await skillController.editSkill(skill_id, skill_name, skill_description, throughline);

    res.send("Skill Edited Successfully! (" + skill_id + skill_name + skill_description + throughline + ")");
});

// USERS
router.get('/edit-user-form', async function(req, res){
    const exampleData = {user_id: 101, email: 'ecapaldi@andover.edu', first_name: "Emma", last_name: "Capaldi", graduation_year: 2025, bio: "In my free time ..."}

    res.render("admin_edit_forms/edit_user_form", {
        user : exampleData
    });
});

router.post('/edit-user', async function(req, res){
    const user_id = req.body.user_id;
    const email = req.body.email;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const graduation_year = req.body.graduation_year;
    const bio = req.body.bio;

    await userController.editUser(user_id, email, first_name, last_name, parseInt(graduation_year), bio);

    res.send("User Edited Successfully!", user_id, email, first_name, last_name, parseInt(graduation_year), bio);
});

// SKILLS
router.get('/edit-skill-form', async function(req, res){
    const exampleData = {
        skill_id : "102",
        skill_name : "Refactoring Code",
        skill_description : "This skill ...",
        throughline : "Working With Code"
    }

    res.render("admin_edit_forms/edit_skill_form", {
        skill : exampleData
    });
});

router.post('/edit-skill', async function(req, res){
    const skill_id = req.body.skill_id;
    const skill_name = req.body.skill_name;
    const skill_description = req.body.skill_description;
    const throughline = req.body.throughline;

    console.log(skill_id + skill_name + skill_description + throughline)

    await skillController.editSkill(skill_id, skill_name, skill_description, throughline);

    res.send("Skill Edited Successfully! (" + skill_id + skill_name + skill_description + throughline + ")");
});

// ADMINS
router.get('/edit-admin-form', async function(req, res){

    const exampleData = {admin_id: 103, email: 'nzufelt@andover.edu', password: "$2a$12$VvnJbkxgor1ktfpHvQD0g.k6bKAh7ZTZOoQky1k9TggsgxVo9ahIi", name: "Nick Zufelt", bio: "I love to teach..."}
    
    res.render("admin_edit_forms/edit_admin_form", {
        admin : exampleData
    });
});

router.post('/edit-admin', async function(req, res){
    const admin_id = req.body.admin_id;
    const email = req.body.email;
    const password_unencrypted = req.body.password;
    const password_encrypted = await bcrypt.hash(password_unencrypted, 10);
    const name = req.body.name;
    const bio = req.body.bio;

    await adminController.editAdmin(admin_id, email, password_encrypted, name, bio);

    res.send("Admin Edited Successfully!", admin_id, email, password_encrypted, name, bio);
});

// EXHIBTIONS
router.get('/edit-exhibition-form', async function(req, res){
    const exampleData = {exhibition_id: 1001, user_id_ref: 102, class_id_ref: 101, display_on_home_page: true, description: "In this video...",video_html_code:'<iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/1188822/sp/118882200/embedIframeJs/uiconf_id/25697092/partner_id/1188822?iframeembed=true&playerId=kaltura_player&entry_id=1_ofiuys05&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[hotspots.plugin]=1&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_4mlte2vv" width="400" height="285" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-downloads allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Screen Recording 2024-04-23 at 2.18.06 PM"></iframe>'}
    const skillExampleData = [
        {skill_id: 101, skill_name: "Speaking in Translations", skill_description: "This skill ...", throughline: "Human Communication"},
        {skill_id: 102, skill_name: "Refactoring Code", skill_description: "This skill ...", throughline: "Working With Code"},
    ]
    const coursesExampleData = [
        {course_id: 10001, course_number: "CSC573", course_name: 'Project-Based Term of CS', course_description: "In this class ... ", course_level:'Advanced'},
        {course_id: 10002, course_number: "CSC402", course_name: 'Web Dev', course_description: "In this class ... ", course_level:'Advanced'},
    ]

    res.render("admin_edit_forms/edit_exhibition_form", {
        exhibition : exampleData,
        skills : skillExampleData,
        courses : coursesExampleData
    });
});

router.post('/edit-exhibition', async function(req, res){
    const exhibition_id = req.body.exhibition_id;
    const email = req.body.email;
    const password = req.body.password; 
    const name = req.body.name;
    const bio = req.body.bio;

    // NEED SPECIFIC EDIT EXHIBITION FORM FOR THIS SENARIO
    //await exhibitionController.editExhibition(exhibition_id, email, password, name, bio);

    res.send("Admin Edited Successfully!", admin_id, email, password, name, bio);
});