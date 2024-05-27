const exhibitionController = require('./controllers/exhibition_table_queries');
const exhibitionSkillPairController = require('./controllers/exhibitionSkillPairs_table_queries');
const userController = require('./controllers/user_table_queries');
const skillController = require('./controllers/skill_table_queries');
const classController = require('./controllers/class_table_queries');
const courseController = require('./controllers/course_table_queries');
const adminController = require('./controllers/admin_table_queries');

const getParametersSearchPage = async(students, teachers, skills, courses, year, term, level) => {
  // REFACTORING CHECK: ERROR CHECKING BEFORE SETTING, WHAT IF SOMEONE DOESN'T PUT ANYTHING/PUTS A LETTER INSTEAD OF A NUMBER
 
  var course_level = "[]"
  if (typeof level !== 'undefined') {
    course_level = level.replaceAll("%22", '"')
  }

  var skills_array = "[]"
  if (typeof skills !== 'undefined') {
    skills_array = skills.replaceAll("%22", '"')
  }

  var course_array = "[]"
   if (typeof courses !== 'undefined') {
    course_array = courses.replaceAll("%22", '"')
  }
 
   var search_parameters = {
     user_id : JSON.parse(students || "[]"),
     admin_id : JSON.parse(teachers || "[]"),
     skill_id : JSON.parse(skills_array),
     course_id : JSON.parse(course_array),
     academic_year : JSON.parse(year || "[]"),
     term : JSON.parse(term || "[]"),
     course_level : JSON.parse(course_level), // MAY HAVE TO REPLACE THIS IN THE FUTURE
   };

   return search_parameters;
}

// NOTE TO SELF I THINK EVERYTHING IN THIS FUNCTION NEEDS TO BE ERROR-CHECKED
const transferEoLsToDatabase = async(EoLs) => {
  for (const eol of EoLs) {
    // UPDATE/CREATE USER
    // if user already exists, get (from unique email identifier)
    user_ref_array =  await userController.getUserByEmail(eol.Email);

    user_id = 0; 

    if (user_ref_array.length > 0) {
      // EDIT USER
      user_id = user_ref_array[0].user_id; // returns the first JSON object

      // update bio if necessary
      if (eol.bio_query) {
        bio = eol.student_bio;
        await userController.editUser(user_id, eol.Email, eol.first_Name, eol.last_Name, parseInt(eol.graduation_year), bio);
      } else {
        await userController.editUserNoBio(user_id, eol.Email, eol.first_Name, eol.last_Name, parseInt(eol.graduation_year));
        // edit user without bio
      }
    } else {
      // MAKE USER
      bio = ""
      if (eol.bio_query) {
        bio = eol.student_bio
      }
      user = await userController.createUser(eol.Email, eol.first_Name, eol.last_Name, eol.graduation_year, bio);
      user_id = user[0].user_id;
    }

    // GET COURSE 
    // unwrap course name/number string
    course_number_name = eol.course;
    course_number_name_array = course_number_name.split("-");
    // clean array
    course_number_name_array_cleaned = course_number_name_array.map(term => term.trim());

    // get course id
    course_array = await courseController.getCourseIdFromCourseNumberName(course_number_name_array_cleaned[0], course_number_name_array_cleaned[1]);
    course_id = course_array[0].course_id;

    // GET ADMIN 
    admin_array = await adminController.GetAdminByEmail(eol.teacher_email); // TEACHER EMAIL CHANGE
    admin_id = admin_array[0].admin_id;

    // GET/CREATE CLASS
    // turn term into number
    const term_string = eol.term;
    term_number = 0;
    if (term_string == "Fall"){
      term_number = 0
    } else if (term_string == "Winter"){
      term_number = 1
    } else if (term_string == "Spring"){
      term_number = 2
    }

    class_array = await classController.getClassId(course_id, admin_id, parseInt(eol.academic_year), term_number);

    if (class_array.length > 0) {
      // set class
      class_id = class_array[0].class_id;
    } else {
      // make class
      class_obj = await classController.createClass(course_id, admin_id, parseInt(eol.academic_year), term_number);
      class_id = class_obj[0].class_id;
    }

    // MAKE EXHIBITION
    exhibition = await exhibitionController.createExhibition(user_id, class_id, eol.homepage_query, eol.description, eol.embed_code);
    exhibition_id = exhibition[0].exhibition_id;

    // MAKE EXHIBITION_SKILL PAIRS
    skill_name_1 = eol.skill1.trim();
    skill_1 = await skillController.getIdFromName(skill_name_1);
    skill_id_1 = skill_1[0].skill_id;
    await exhibitionSkillPairController.createExhibitionSkillPair(exhibition_id, skill_id_1);


    skill_name_2 = eol.skill1.trim();
    skill_2 = await skillController.getIdFromName(skill_name_2);
    skill_id_2 = skill_2[0].skill_id;
    await exhibitionSkillPairController.createExhibitionSkillPair(exhibition_id, skill_id_2);
  };
}

module.exports = {
  getParametersSearchPage,
  transferEoLsToDatabase
}