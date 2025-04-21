const db = require("../config/db.config");

const getByViajeId = async (viajeId) => {
    try {
        const [result] = await db.query(
            `SELECT c.*, u.nombre 
            FROM comentarios c 
            LEFT JOIN usuarios u ON c.usuarios_id_usuario = u.id_usuario 
            WHERE c.viajes_id_viaje = ? 
            ORDER BY c.fecha_comentario DESC`,
            [viajeId],
        );
        return result; // Retorna los comentarios o un array vacío si no hay resultados
    } catch (error) {
        console.error("Error al obtener comentarios:", error);
        throw new Error("Error al obtener comentarios");
    }
};

const createComment = async (viajeId, usuarioId, comentario) => {
    try {
        const [result] = await db.query(
            // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
            `INSERT INTO comentarios (viajes_id_viaje, usuarios_id_usuario, comentario) VALUES (?, ?, ?)`,
            [viajeId, usuarioId, comentario],
        );
        return { success: true, insertId: result.insertId }; // Devuelve éxito y el ID insertado
    } catch (error) {
        console.error("Error al agregar comentario:", error);
        throw new Error("Error al agregar comentario");
    }
};

const updateComment = async (commentId, usuarioId, comentario) => {
    try {
        const [result] = await db.query(
            `UPDATE comentarios 
            SET comentario = ? 
            WHERE id_comentario = ? AND usuarios_id_usuario = ?`,
            [comentario, commentId, usuarioId],
        );

        // Retorna si se actualizó o no, basado en el número de filas afectadas
        return {
            success: result.affectedRows > 0,
            affectedRows: result.affectedRows,
        };
    } catch (error) {
        console.error("Error al editar comentario:", error);
        throw new Error("Error al editar comentario");
    }
};

const deleteComment = async (commentId, usuarioId) => {
    try {
        const [result] = await db.query(
            `DELETE FROM comentarios 
            WHERE id_comentario = ? AND usuarios_id_usuario = ?`,
            [commentId, usuarioId],
        );

        // Retorna si se eliminó o no, basado en el número de filas afectadas
        return {
            success: result.affectedRows > 0,
            affectedRows: result.affectedRows,
        };
    } catch (error) {
        console.error("Error al eliminar comentario:", error);
        throw new Error("Error al eliminar comentario");
    }
};

module.exports = { getByViajeId, createComment, updateComment, deleteComment };
