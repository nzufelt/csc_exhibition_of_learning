// functions associated with getting data from the skill table
const db = require("../db/db")

// get and send all skills
const getAllSkills = async(req, res) => {
    try {
        const skills = await db.select("*").from("skills");
        res.send(skills);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }
}

// get all skills (json)
const getAllSkillsJSON = async() => {
    try {
        const skills = await db.select("*").from("skills");
        return skills;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// get skill_id given name
const getIdFromName = async(skill_name) => {
    try {
        const skills = await db.select("skill_id")
        .from("skills")
        .where("skill_name", skill_name);
        return skills;
    } catch (error) {
        console.error(error);
        return [];
    }
}

//CRUD OPERATIONS
// create
const createSkill = async(skill_name, skill_description, throughline) => {
    await db('skills').insert({
        skill_name,
        skill_description,
        throughline
    });
}

// edit
const editSkill = async(skill_id, skill_name, skill_description, throughline) => {
    await db('skills')
    .where("skill_id", skill_id)
    .update({
        skill_name,
        skill_description,
        throughline
    });
}

// delete
const deleteSkill = async(skill_id) => {
    await db('skills')
    .where("skill_id", skill_id)
    .del();
}

// export all functions
module.exports = {
    getAllSkills,
    getAllSkillsJSON,
    getIdFromName,
    createSkill,
    editSkill,
    deleteSkill
};