const connection = require('../db/connection');

exports.getAllusers = () => connection('users').select('*');
