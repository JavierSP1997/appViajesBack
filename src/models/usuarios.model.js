const db = require("../config/db.config");

const selectAll = async () => {
    const [result] = await db.query("select * from usuarios");
    return result;
};

const selectId = async (usuariosId) => {
    const [result] = await db.query("select * from usuarios where id_usuario = ?", [
        usuariosId,
    ]);
    if (result.length === 0) return null;
    return result[0];
}

const deleteById = async (usuariosId) => {
    const id = Number(usuariosId);
    const [result] = await db.query("DELETE FROM usuarios WHERE id_usuario = ?", [id]);
    return result;
};

module.exports = { 
    selectAll,
    deleteById, selectId };