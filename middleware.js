const exhibitionController = require('./controllers/exhibition_table_queries');
const userController = require('./controllers/user_table_queries');
const skillController = require('./controllers/skill_table_queries');
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

const transferEoLsToDatabase = async(EoLs) => {
  EoLs.forEach(eol => {
    //make/update user
    // make exhibition
    user_id_ref_array =  userController.findUserByEmail(eol.Email); //await

    if (user_id_ref_array.length > 0) {
      const user_id = user_id_ref[0]
    } else {
      // make user

      bio = ""
      if (eol.bio_query) {
        const bio = eol.student_bio
      }
       userController.createUser(eol.Email, eol.first_Name, eol.last_Name, eol.graduation_year, bio); //await
    }

    //const user_id_ref = 
    //const class_id_ref = 
    const display_on_home_page = eol.homepage_query;
    const description = eol.description;
    const video_html_code = eol.embed_code;

    const user_info = []
    const exhibition_skill_pairs = []
    //const admin_info = []
    

    // make exhibition skill pairs

    // second: make classes/users that don't exist yet
    console.log(eol);
  });
}

module.exports = {
    getParametersSearchPage,
}