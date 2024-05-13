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

module.exports = {
    getAllClasses,
    getAcademicYears
};