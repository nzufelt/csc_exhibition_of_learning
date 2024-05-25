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
    user_id_ref_array =  await userController.getUserByEmail(eol.Email);

    const user_id = 0;

    if (user_id_ref_array.length > 0) {
      // EDIT USER
      const user_id = user_id_ref[0];
      if (eol.bio_query) {
        bio = eol.student_bio;
      } else {
        bio_array = await userController.getBioById(user_id);
        bio = bio_array[0];
      }
      await userController.editUser(user_id, eol.Email, eol.first_Name, eol.last_Name, eol.graduation_year, bio);
    } else {
      // MAKE USER
      const bio = ""
      if (eol.bio_query) {
        bio = eol.student_bio
      }
      user = await userController.createUser(eol.Email, eol.first_Name, eol.last_Name, eol.graduation_year, bio);
      user_id = user.user_id;
    }

    // GET COURSE 
    // unwrap course name/number string
    const course_number_name = eol.course;
    const course_number_name_array = course_number_name.split("-");
    // clean array
    const course_number_name_array_cleaned = course_number_name_array.map(term => term.replace(/\s+(?=\b)|\b\s+/g, ''));
    // get course id
    const course_id_array = await courseController.getCourseIdFromCourseNumberName(course_number_name_array_cleaned[0], course_number_name_array_cleaned[1]);
    const course_id = course_id_array[0];

    // GET ADMIN 
    const admin_id_array = await adminController.GetAdminByEmail(eol.Email);
    const admin_id = admin_id_array[0];

    // GET/CREATE ClASS
    const class_id_array = await classController.getClassId(course_id, admin_id, eol.academic_year, eol.term);
    const class_id = class_id_array[0];

    // MAKE EXHIBITION

    const exhibition = await exhibitionController.createExhibition(user_id, class_id, eol.homepage_query, eol.description, eol.video_html_code);
    exhibition_id = exhibition.exhibition_id;

    // MAKE EXHIBITION_SKILL PAIRS
    skill_name_1 = eol.skill1.replace(/\s+(?=\b)|\b\s+/g, '');
    skill_id_1 = await skillController.getIdFromName(eol.skill1);
    await exhibitionSkillPairController.createExhibitionSkillPair(exhibition_id, skill_id_1);

    skill_name_2 = eol.skill1.replace(/\s+(?=\b)|\b\s+/g, '');
    skill_id_2 = await skillController.getIdFromName(eol.skill2);
    await exhibitionSkillPairController.createExhibitionSkillPair(exhibition_id, skill_id_2);
  };
}

module.exports = {
    getParametersSearchPage,
}