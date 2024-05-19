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

module.exports = {
    getAllAdmins,
    GetAdminByEmail,
    GetAdminById,
    getAllAdminsJSON
};