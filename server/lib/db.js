var mysql = require('mysql2');

const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

const config = require(path.join(__dirname, '..', 'config', 'db.json'))[ env ];
var db = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database,

});
db.connect();

module.exports = db;