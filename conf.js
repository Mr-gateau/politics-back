require('dotenv').config();
const  mysql = require('mysql');

const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
port : process.env.DB_PORT || '3306',
user: process.env.DB_USER || 'root',
password: process.env.DB_PASS || 'root',
database : 'politics'
});
module.exports = connection;
