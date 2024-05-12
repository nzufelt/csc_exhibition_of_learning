// create initial database schema

exports.up = function(knex) {
    return knex.schema
    .createTable('users', (table) => {
        table.increments('user_id').primary(); 

        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.integer('graduation_year').notNullable();
        table.text('bio').notNullable();
    })

    .createTable('admins', (table) => {
        table.increments('admin_id').primary(); 

        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.text('bio').notNullable();
    })

    .createTable('courses', (table) => {
        table.increments('course_id').primary();

        table.string('course_number').notNullable();
        table.string('course_name').notNullable();
        table.text('course_description').notNullable();
        table.string('course_level').notNullable();
    })

    .createTable('classes', (table) => {
        table.increments('class_id').primary();

        table.integer("course_id_ref")
            .references("course_id")
            .inTable("courses")
            .onUpdate('CASCADE')
            .onDelete("CASCADE");

        table.integer("admin_id_ref")
            .references("admin_id")
            .inTable("admins")
            .onUpdate('CASCADE')
            .onDelete("CASCADE");

        table.integer('academic_year').notNullable();
        table.integer('term').notNullable();
    })

    .createTable('exhibitions', (table) => {
        table.increments('exhibition_id').primary(); 

        table.integer('user_id_ref').notNullable()
            .references("user_id")
            .inTable("users")
            .onUpdate('CASCADE')
            .onDelete("CASCADE");

        table.integer('class_id_ref').notNullable()
            .references("class_id")
            .inTable("classes")
            .onUpdate('CASCADE')
            .onDelete("CASCADE");

        table.boolean('display_on_home_page').notNullable();
        table.text('description').notNullable();
        table.text('video_html_code').notNullable();
    })

    .createTable('skills', (table) => {
        table.increments('skill_id').primary();
        table.string('skill_name').notNullable(); 
        table.text('skill_description').notNullable();
        table.string('throughline').notNullable();
    })

    .createTable('exhibitionSkillPairs', (table) => {
        table.integer('exhibition_id_ref').notNullable()
            .references("exhibition_id")
            .inTable("exhibitions")
            .onUpdate('CASCADE')
            .onDelete("CASCADE");

        table.integer('skill_id_ref').notNullable()
            .references("skill_id")
            .inTable("skills")
            .onUpdate('CASCADE')
            .onDelete("CASCADE");
    })
    ;
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('exhibitionSkillPairs')
    .dropTableIfExists('skills')
    .dropTableIfExists('exhibitions')
    .dropTableIfExists('classes')
    .dropTableIfExists('courses')
    .dropTableIfExists('admins')
    .dropTableIfExists('users');
};