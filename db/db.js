const knex = require('knex');
const knexfile = require('../knexfile');

const environment = process.env.DB_ENVIRONMENT || "development";
module.exports = knex(knexfile[environment]);