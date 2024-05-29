// functions associated with getting data from the exhibition skill pair table
const db = require("../db/db")

//CRUD OPERATIONS
//create
const createExhibitionSkillPair = async(exhibition_id_ref, skill_id_ref) => {
    await db('exhibitionSkillPairs').insert({
        exhibition_id_ref, 
        skill_id_ref
    });
}

// edit
const editExhibitionSkillPair = async(exhibition_id_ref_original, skill_id_ref_original, exhibition_id_ref, skill_id_ref) => {
    await db('exhibitionSkillPairs')
    .where("exhibition_id_ref", exhibition_id_ref_original)
    .where("skill_id_ref", skill_id_ref_original)
    .update({
        exhibition_id_ref, 
        skill_id_ref
    });
}

// delete
const deleteExhibitionSkillPair = async(exhibition_id_ref_original, skill_id_ref_original) => {
    await db('exhibitionSkillPairs')
    .where("exhibition_id_ref", exhibition_id_ref_original)
    .where("skill_id_ref", skill_id_ref_original)
    .del();
}

// export all functions
module.exports = {
    createExhibitionSkillPair,
    editExhibitionSkillPair,
    deleteExhibitionSkillPair
};