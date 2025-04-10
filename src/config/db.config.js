const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "Pilaralcalde11",
    port: 3306,
    database: "blog_viajes",
});

module.exports = pool.promise();
