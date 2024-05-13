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

module.exports = {
    getAllAdmins
};