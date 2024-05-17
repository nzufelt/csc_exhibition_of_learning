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

const getAllUsersJSON = async() => {
    try {
        const users = await db.select("*").from("users");
        return users;
    } catch (error) {
        console.error(error);
        return [];
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

module.exports = {
    getAllUsers,
    getStudentNames,
    getAllUsersJSON
};