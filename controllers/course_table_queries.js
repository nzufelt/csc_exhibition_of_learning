// functions associated with getting data from the course table
const db = require("../db/db")

// get and send all courses
const getAllCourses = async(req, res) => {
    try {
        const courses = await db.select("*").from("courses")
        res.send(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message}) 
    }
}

// get all courses (json)
const getAllCoursesJSON = async() => {
    try {
        const courses = await db.select("*").from("courses")
        return courses;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// get a list of unique course names and numbers
const getUniqueCourseNames = async(req, res) => {
    try {
        const courses = await db.select(["course_name", "course_number"]).from("courses")
            .distinct();

        res.send(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }
}

// get course_id given number and name
const getCourseIdFromCourseNumberName = async(course_number, course_name) => {

    try {
        const courses = await db
        .select("course_id")
        .from("courses")
        .where("course_name", course_name)
        .where("course_number", course_number);

        return courses;
    } catch (error) {
        return [];
    }
}

//CRUD OPERATIONS
// create
const createCourse = async(course_number, course_name, course_description, course_level) => {
    console.log("creating course!")
    await db('courses').insert({
        course_number,
        course_name,
        course_description,
        course_level
    });
}

// edit
const editCourse = async(course_id, course_number, course_name, course_description, course_level) => {
    await db('courses')
    .where("course_id", course_id)
    .update({
        course_number,
        course_name,
        course_description,
        course_level
    });
}

// delete
const deleteCourse = async(course_id) => {
    await db('courses')
    .where("course_id", course_id)
    .del();
}

//export all functions
module.exports = {
    getAllCourses,
    getUniqueCourseNames,
    getAllCoursesJSON,
    createCourse,
    editCourse,
    deleteCourse,
    getCourseIdFromCourseNumberName
};