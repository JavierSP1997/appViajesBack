const db = require("../config/db.config");

const insert = async ({ nombre, email, password, fecha_registro }) => {
    const [result] = await db.query(
        "insert into usuarios (nombre, email, password, fecha_registro) values (?, ?, ?, ?)",
        [nombre, email, password, fecha_registro],
    );
    return result;
};

const selectId = async (usuarioId) => {
    const [result] = await db.query(
        "select * from usuarios where id_usuario = ?",
        [usuarioId],
    );
    if (result.length === 0) return null;
    return result[0];
};

const updateById = async (
    usuarioId,
    { nombre, email, password, fecha_registro },
) => {
    const [result] = await db.query(
        "UPDATE usuarios SET nombre = ?, email = ?, password = ?, fecha_registro = ? WHERE id_usuario = ?",
        [nombre, email, password, fecha_registro, usuarioId],
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
    selectId,
    updateById,
    deleteById,
};
