const db = require("../config/db.config");

const getByViajeId = async (viajeId) => {
    const [result] = await db.query(
        `SELECT c.*, u.nombre 
     FROM comentarios c 
     JOIN usuarios u ON c.usuarios_id_usuario = u.id_usuario 
     WHERE c.viajes_id_viaje = ? 
     ORDER BY c.fecha_comentario DESC`,
        [viajeId],
    );
    return result;
};

const createComment = async (viajeId, usuarioId, comentario) => {
    const [result] = await db.query(
        // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
        `INSERT INTO comentarios (viajes_id_viaje, usuarios_id_usuario, comentario) VALUES (?, ?, ?)`,
        [viajeId, usuarioId, comentario],
    );
    return result.insertId;
};

module.exports = { getByViajeId, createComment };
