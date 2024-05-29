// import knex
const knex = require('knex');
const knexfile = require('../knexfile');

// set environment based on heroku environment variable
const environment = process.env.DB_ENVIRONMENT || "development";
module.exports = knex(knexfile[environment]);