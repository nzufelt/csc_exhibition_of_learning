const getParametersSearchPage = async(students, teachers, skills, courses, year, term, level) => {
    // REFACTORING CHECK: ERROR CHECKING BEFORE SETTING, WHAT IF SOMEONE DOESN'T PUT ANYTHING/PUTS A LETTER INSTEAD OF A NUMBER
 
   var course_level = "[]"
   if (typeof level !== 'undefined') {
     course_level = level.replaceAll("%22", '"')
   }
 
   var search_parameters = {
     user_id : JSON.parse(students || "[]"),
     admin_id : JSON.parse(teachers || "[]"),
     skill_id : JSON.parse(skills || "[]"),
     course_id : JSON.parse(courses || "[]"),
     academic_year : JSON.parse(year || "[]"),
     term : JSON.parse(term || "[]"),
     course_level : JSON.parse(course_level), // MAY HAVE TO REPLACE THIS IN THE FUTURE
   };

   return search_parameters;
}

module.exports = {
    getParametersSearchPage,
}