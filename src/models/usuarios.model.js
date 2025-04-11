const db = require("../config/db.config");

const selectAll = async () => {
    const [result] = await db.query("select * from usuarios");
    return result;
};

const selectId = async (usuariosId) => {
    const [result] = await db.query(
        "select * from usuarios where id_usuario = ?",
        [usuariosId],
    );
    if (result.length === 0) return null;
    return result[0];
};
const insert = async ({ nombre, email, password, fecha_registro }) => {
    const [result] = await db.query(
        "insert into usuarios (nombre, email, password, fecha_registro) values (?, ?, ?, ?)",
        [nombre, email, password, fecha_registro],
    );
    return result;
};

const deleteById = async (usuariosId) => {
    const id = Number(usuariosId);
    const [result] = await db.query(
        "DELETE FROM usuarios WHERE id_usuario = ?",
        [id],
    );
    return result;
};

module.exports = {
    selectAll,
    deleteById,
    selectId,
    insert,
};
