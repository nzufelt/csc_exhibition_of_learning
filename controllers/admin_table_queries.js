// functions associated with getting data from the admin table
const db = require("../db/db")

const getAllAdmins = async(req, res) => {
    try {
        const admins = await db.select("*").from("admins");
        res.send(admins);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }
}

const getAllAdminsJSON = async() => {
    try {
        const admins = await db.select("*").from("admins");
        return admins;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const GetAdminByEmail = async(email) => {
    try {
        const admin = await db.select("*")
        .from("admins")
        .where("email", email);
        return admin;
    } catch (error) {
        console.error(error);
        return "";
    }
}

const GetAdminById = async(id) => {
    try {
        const admin = await db.select("*")
        .from("admins")
        .where("admin_id", id);
        return admin;
    } catch (error) {
        console.error(error);
        return "";
    }
}

//CRUD OPERATIONS
const createAdmin = async(email, password, name, bio) => {
    console.log("creating admin!")
    await db('admins').insert({
        email,
        password,
        name,
        bio
    });
}

// IN PROGRESS
const editAdmin = async(admin_id, email, password, name, bio) => {
    await db('admins')
    .where("admin_id", admin_id)
    .update({
        email, 
        password, 
        name, 
        bio
    });
}

// IN PROGRESS
const deleteAdmin = async(admin_id) => {
    await db('admins')
    .where("admin_id", admin_id)
    .del();
}

module.exports = {
    getAllAdmins,
    GetAdminByEmail,
    GetAdminById,
    getAllAdminsJSON,
    createAdmin,
    editAdmin,
    deleteAdmin
};