// functions associated with getting data from the user table
const db = require("../db/db")

const getAllUsers = async(req, res) => {
    try {
        const users = await db.select("*").from("users");
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }
}

const getStudentNames = async(req, res) => {
    try {
        const users = await db.select(["first_name", "last_name"]).from("users");
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }
}

// all functions must be exported
module.exports = {
    getAllUsers,
    getStudentNames
};