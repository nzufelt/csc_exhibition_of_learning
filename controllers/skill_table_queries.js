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

//CRUD OPERATIONS
const createSkill = async(skill_name, skill_description, throughline) => {
    await db('skills').insert({
        skill_name,
        skill_description,
        throughline
    });
}

// IN PROGRESS 
const editSkill = async(skill_id, skill_name, skill_description, throughline) => {
    await db('skills')
    .where("skill_id", skill_id)
    .update({
        skill_name,
        skill_description,
        throughline
    });
}

// IN PROGRESS
const deleteSkill = async(skill_id) => {
    await db('skills')
    .where("skill_id", skill_id)
    .del();
}

module.exports = {
    getAllSkills,
    getAllSkillsJSON,
    createSkill,
    editSkill,
    deleteSkill
};