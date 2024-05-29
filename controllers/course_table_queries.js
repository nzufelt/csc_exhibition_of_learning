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

// IN PROGRESS: get course id given the course name from an api call -------
// FIX: account for spaces in course name when passed into api call
const getCourseIdFromCourseName = async(req, res) => {
    const course_name = parseInt(req.params.course_name);

    try {
        const courses = await db.select("course_id").from("courses")
            .where("course_name", course_name)

        res.send(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }
}
// ---------

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
const createCourse = async(course_number, course_name, course_description, course_level) => {
    console.log("creating course!")
    await db('courses').insert({
        course_number,
        course_name,
        course_description,
        course_level
    });
}

// IN PROGRESS
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

// IN PROGRESS
const deleteCourse = async(course_id) => {
    await db('courses')
    .where("course_id", course_id)
    .del();
}

module.exports = {
    getAllCourses,
    getUniqueCourseNames,
    getCourseIdFromCourseName,
    getAllCoursesJSON,
    createCourse,
    editCourse,
    deleteCourse,
    getCourseIdFromCourseNumberName
};