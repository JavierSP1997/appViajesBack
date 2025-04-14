const db = require("../config/db.config");

const selectAll = async () => {
    const [result] = await db.query("select * from usuarios");
    return result;
};

const insert = async ({ nombre, email, password }) => {
    const [result] = await db.query(
        "insert into usuarios (nombre, email, password) values (?, ?, ?)",
        [nombre, email, password],
    );
    return result;
};

const selectById = async (usuarioId) => {
    const [result] = await db.query(
        "select * from usuarios where id_usuario = ?",
        [usuarioId],
    );
    if (result.length === 0) return null;
    return result[0];
};

const selectByEmail = async (email) => {
    const [result] = await db.query("select * from usuarios where email = ?", [
        email,
    ]);
    if (result.length === 0) return null;
    return result[0];
};

const updateById = async (usuarioId, { nombre, email, password }) => {
    const [result] = await db.query(
        "UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id_usuario = ?",
        [nombre, email, password, usuarioId],
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
    insert,
    selectById,
    selectByEmail,
    updateById,
    deleteById,
    selectAll,
};
