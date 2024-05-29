// functions associated with getting data from the user table
const db = require("../db/db")

// get and send all users
const getAllUsers = async(req, res) => {
    try {
        const users = await db.select("*").from("users");
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }
}

// get all users (json)
const getAllUsersJSON = async() => {
    try {
        const users = await db.select("*").from("users");
        return users;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// get and send all student names
const getStudentNames = async(req, res) => {
    try {
        const users = await db.select(["first_name", "last_name"]).from("users");
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }
}

// get user_id given user's email
const getUserByEmail = async(email) => {
    try {
        const user = await db.select("user_id").where("email", email).from("users");
        return user;
    } catch (error) {
        return [];
    }
}

// get student bio given user_id
const getBioById = async(user_id) => {
    try {
        const bio = await db
        .select("bio")
        .where("user_id", user_id)
        .from("users");
    } catch (error) {
        return [];
    }
}

//CRUD OPERATIONS
// create
const createUser = async(email, first_name, last_name, graduation_year, bio) => {
    const user = await db('users')
    .returning('*')
    .insert({
        email,
        first_name,
        last_name,
        graduation_year,
        bio
    });

    return user;
}

// edit
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

// edit user without editing their bio
const editUserNoBio = async(user_id, email, first_name, last_name, graduation_year) => {
    await db('users')
    .where("user_id", user_id)
    .update({
        email,
        first_name,
        last_name,
        graduation_year
    });
}

// delete
const deleteUser = async(user_id) => {
    await db('users')
    .where("user_id", user_id)
    .del();
}

// export all functions
module.exports = {
    getAllUsers,
    getStudentNames,
    getAllUsersJSON,
    getUserByEmail,
    createUser,
    editUser,
    editUserNoBio,
    deleteUser,
    getBioById
};