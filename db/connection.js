// const ENV = process.env.NODE_ENV || 'development';
const knex = require('knex');
const dbConfig = require('../knexfile.js');

const connection = knex(dbConfig);
module.exports = connection;
