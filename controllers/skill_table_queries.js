// functions associated with getting data from the skill table
const db = require("../db/db")

const getAllSkills = async(req, res) => {
    try {
        const skills = await db.select("*").from("skills");
        res.send(skills);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }
}

const getAllSkillsJSON = async() => {
    try {
        const skills = await db.select("*").from("skills");
        return skills;
    } catch (error) {
        console.error(error);
        return [];
    }
}

module.exports = {
    getAllSkills,
    getAllSkillsJSON
};