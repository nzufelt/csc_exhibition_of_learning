// functions associated with getting data from the class table
const db = require("../db/db")

const getAllClasses = async(req, res) => {
    try {
        const courses = await db.select("*").from("classes")
        res.send(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message}) 
    }
}

// get unique academic years
const getAcademicYears = async(req, res) => {
    try {
        const years = await db.select("academic_year").from("classes")
            .distinct();
        
        res.send(years);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message}) 
    }
}

//CRUD OPERATIONS
const createClass = async(course_id_ref, admin_id_ref, academic_year, term) => {
    await db('classes').insert({
        course_id_ref,
        admin_id_ref,
        academic_year,
        term
    });
}

// IN PROGRESS
const editClass = async(class_id, course_id_ref, admin_id_ref, academic_year, term) => {
    await db('classes')
    .where("class_id", class_id)
    .update({
        course_id_ref,
        admin_id_ref,
        academic_year,
        term
    });
}

// IN PROGRESS
const deleteClass = async(class_id) => {
    await db('classes')
    .where("class_id", class_id)
    .del();
}

module.exports = {
    getAllClasses,
    getAcademicYears
};