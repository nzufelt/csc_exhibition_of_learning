// add email column to user table

exports.up = function(knex) {
    return knex.schema.table('users', function(table) {
        table.string('email').notNullable()
      })
};

exports.down = function(knex) {
    return knex.schema.table('users', function(table) {
        table.dropColumn('email')
    })
};