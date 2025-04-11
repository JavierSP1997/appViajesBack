const mysql = require("mysql2");

require("dotenv").config();

// Create a connection pool to the MySQL database using environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

module.exports = pool.promise();
