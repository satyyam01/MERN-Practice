// making connection to db

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost", // server location
  user: "root", // username
  database: "airbnb", // db name in mysql
  password: "Satyam2602", // mysql root password
});


module.exports = pool.promise();