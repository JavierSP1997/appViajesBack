const db = require("../config/db.config");

const selectAll = async () => {
    const [result] = await db.query("select * from usuarios");
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

module.exports = { selectAll, updateById, selectId };
