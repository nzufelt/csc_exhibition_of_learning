// functions associated with getting data from the exhibition table
const { query } = require("express");
const db = require("../db/db")

// get and send all exhibitions
const getAllExhibitions = async(req, res) => {
    try {
        const exhibitions = await db.select("*").from("exhibitions");
        res.send(exhibitions);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message}) 
    }
}

// get and send exhibitions that can be displayed on the home page
const getExhibitionsHomePage = async(req, res) => {
    try {
        const exhibitions = await db.select("*").from("exhibitions")
            .where("display_on_home_page", true);
        res.send(exhibitions);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }
}

// get a json string of the exhibitions that can be displayed on the home page
const getExhibitionsHomePageJSON = async() => {
    try {
        columns = ['exhibitions.exhibition_id', 'exhibitions.description', 'exhibitions.video_html_code', 'users.first_name', 'users.last_name', 'classes.academic_year', 'classes.term', 'courses.course_number', 'courses.course_name']
        const exhibitions = await db
            .select(columns.concat([
                db.raw('ARRAY_AGG(skills.skill_name) skills'),
                db.raw('ARRAY_AGG(skills.throughline) throughlines')
               ]))
            .from("exhibitions")
            
            .where("display_on_home_page", true)
            .innerJoin("users", "exhibitions.user_id_ref", "=", "users.user_id")
            .innerJoin("classes", "exhibitions.class_id_ref", "=", "classes.class_id")
            .innerJoin("courses", "classes.course_id_ref", "=", "courses.course_id")
            .leftJoin("exhibitionSkillPairs", "exhibitions.exhibition_id", "exhibitionSkillPairs.exhibition_id_ref")
            
            .leftJoin("skills", "exhibitionSkillPairs.skill_id_ref", "skills.skill_id")
            
            .groupBy(columns)
            ;
        return exhibitions;
    } catch (error) {
        console.log(error)
        return [];
    }
}

// get exhibitions by search parameters
const getExhibitionsSearchResults = async(search_parameters) => {
    var user_id = search_parameters.user_id;
    var course_id = search_parameters.course_id;
    var admin_id = search_parameters.admin_id; 
    var skill_id = search_parameters.skill_id; 
    var academic_year = search_parameters.academic_year;
    var term = search_parameters.term;
    var course_level = search_parameters.course_level;
    console.log("user id:", user_id)

    try {
        columns = ['exhibitions.exhibition_id', 'exhibitions.description', 'exhibitions.video_html_code', 'users.first_name', 'users.last_name', 'classes.academic_year', 'classes.term', 'courses.course_number', 'courses.course_name']

        const exhibitions = 
        await db
        //.select("*")
        .select(columns
            .concat([
            db.raw('ARRAY_AGG(skills.skill_name) skills'),
            db.raw('ARRAY_AGG(skills.throughline) throughlines')
           ])
           )


        .from("exhibitions")
        .innerJoin("users", "exhibitions.user_id_ref", "=", "users.user_id")
        .innerJoin("classes", "exhibitions.class_id_ref", "=", "classes.class_id")
        .innerJoin("courses", "classes.course_id_ref", "=", "courses.course_id")
        .innerJoin("admins", "classes.admin_id_ref", "=", "admins.admin_id")
            .modify(function(queryBuilder) {
                queryBuilder.leftJoin("exhibitionSkillPairs", "exhibitions.exhibition_id", "exhibitionSkillPairs.exhibition_id_ref")
                .leftJoin("skills", "exhibitionSkillPairs.skill_id_ref", "skills.skill_id")
                if(skill_id.length != 0){
                    queryBuilder
                    .whereIn("exhibitionSkillPairs.skill_id_ref", skill_id)
                    
                }
                queryBuilder.distinctOn('exhibition_id')

                if(user_id.length != 0){
                    queryBuilder
                    .whereIn("users.user_id", user_id)
                }

                if(course_id.length != 0){
                    queryBuilder
                    .whereIn("courses.course_id", course_id)
                }

                if(admin_id.length != 0){
                    queryBuilder
                    .whereIn("admins.admin_id", admin_id)
                }

                if(academic_year.length != 0){
                    queryBuilder.whereIn("classes.academic_year", academic_year)
                }

                if(term.length != 0){
                    queryBuilder.whereIn("classes.term", term)
                }

                if(course_level.length != 0){
                    console.log("we're in!")
                    console.log(course_level)
                    queryBuilder.whereIn("courses.course_level", course_level)
                }
           })
           .groupBy(columns)

        return exhibitions;
    } catch (error) {
        console.log(error)
        return [];
    }

}

// get tags to be displayed on search results page
const getTagDisplay = async(search_parameters) => {
    var user_id_array = search_parameters.user_id;
    var course_id_array = search_parameters.course_id;
    var admin_id_array = search_parameters.admin_id; 
    var skill_id_array = search_parameters.skill_id; 

    console.log(user_id_array);

    var tag_display_array = [];

    try {
        if(user_id_array.length != 0) {
            for(let i = 0; i < user_id_array.length; i++){
                var user = await db.select("*").from("users").where("user_id", user_id_array[i]);
                    if (user.length != 0) {
                    var tag_name = user[0].first_name + " " + user[0].last_name;
                    var tag_description = user[0].bio;
                    tag_display_array.push({
                        tag_name : tag_name,
                        tag_description : tag_description,
                    });
                }
            }
        } else {
            if(course_id_array.length != 0) {
                for(let i = 0; i < course_id_array.length; i++){
                    var course = await db.select("*").from("courses").where("course_id", course_id_array[i]);
                        if (course.length != 0) {
                        var tag_name = course[0].course_number + ": " + course[0].course_name;
                        var tag_description = course[0].course_description;
                        tag_display_array.push({
                            tag_name : tag_name,
                            tag_description : tag_description,
                        });
                    }
                }
            }
            if(admin_id_array.length != 0) {
                for(let i = 0; i < admin_id_array.length; i++){
                    var admin = await db.select("*").from("admins").where("admin_id", admin_id_array[i]);
                        if (admin.length != 0) {
                        var tag_name = admin[0].name;
                        var tag_description = admin[0].bio;
                        tag_display_array.push({
                            tag_name : tag_name,
                            tag_description : tag_description,
                        });
                    }
                }
            }
            if(skill_id_array.length != 0) {
                for(let i = 0; i < skill_id_array.length; i++){
                    var skill = await db.select("*").from("skills").where("skill_id", skill_id_array[i]);
                        if (skill.length != 0) {
                        var tag_name = skill[0].skill_name;
                        var tag_description = skill[0].skill_description;
                        tag_display_array.push({
                            tag_name : tag_name,
                            tag_description : tag_description,
                        });
                    }
                }
            }
        }

        console.log("tag display", tag_display_array);
        return tag_display_array;
    } catch (error) {
        console.log(error)
        return [];
    }

}

//CRUD OPERATIONS
//create
const createExhibition = async(user_id_ref, class_id_ref, display_on_home_page, description, video_html_code) => {
    const exhibition = await db('exhibitions')
    .returning("*")
    .insert({
        user_id_ref,
        class_id_ref,
        display_on_home_page,
        description,
        video_html_code
    });

    return exhibition;
}

//edit
const editExhibition = async(exhibition_id, display_on_home_page, description, video_html_code, skill_id_1, skill_id_2) => {
    await db('exhibitions')
    .where("exhibition_id", exhibition_id)
    .update({
        display_on_home_page,
        description,
        video_html_code
    });

    await db("exhibitionSkillPairs")
    .where("exhibition_id_ref", exhibition_id)
    .del();

    await db("exhibitionSkillPairs")
    .insert(
        [{
            exhibition_id_ref : exhibition_id, 
            skill_id_ref: skill_id_1
        },
        {
            exhibition_id_ref: exhibition_id, 
            skill_id_ref: skill_id_2
        }]
    )
}

// delete
const deleteExhibition = async(exhibition_id) => {
    await db('exhibitions')
    .where("exhibition_id", exhibition_id)
    .del();
}

// export all functions
module.exports = {
    getAllExhibitions,
    getExhibitionsHomePage,
    getExhibitionsHomePageJSON,
    getExhibitionsSearchResults,
    getTagDisplay,
    createExhibition,
    editExhibition,
    deleteExhibition
};