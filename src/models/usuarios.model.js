const db = require("../config/db.config");

const selectAll = async () => {
    const [result] = await db.query("select * from usuarios");
    return result;
};

const insert = async ({ nombre, email, password, fecha_registro }) => {
    const [result] = await db.query(
        "insert into usuarios (nombre, email, password, fecha_registro) values (?, ?, ?, ?)",
        [nombre, email, password, fecha_registro],
    );
    return result;
};

module.exports = { selectAll, insert };
