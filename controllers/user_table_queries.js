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

const getUserByEmail = async(email) => {
    try {
        const user = await db.select("user_id").where("email", email).from("users");
        return user;
    } catch (error) {
        return [];
    }
}

//CRUD OPERATIONS
const createUser = async(email, first_name, last_name, graduation_year, bio) => {
    await db('skills').insert({
        email,
        first_name,
        last_name,
        graduation_year,
        bio
    });
}

// IN PROGRESS 
const editUser = async(user_id, email, first_name, last_name, graduation_year, bio) => {
    await db('users')
    .where("user_id", user_id)
    .update({
        email,
        first_name,
        last_name,
        graduation_year,
        bio
    });
}

// IN PROGRESS
const deleteUser = async(user_id) => {
    await db('users')
    .where("user_id", user_id)
    .del();
}

module.exports = {
    getAllUsers,
    getStudentNames,
    getAllUsersJSON,
    getUserByEmail,
    createUser
};