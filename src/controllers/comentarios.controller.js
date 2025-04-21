const comentarioModel = require("../models/comentarios.model");

const obtenerComentarios = async (req, res) => {
    try {
        const { viajeId } = req.params;
        const comentarios = await comentarioModel.getByViajeId(viajeId);
        res.json(comentarios);
    } catch (error) {
        console.error("Error al obtener comentarios:", error);
        res.status(500).json({
            message: "Error al obtener los comentarios",
            error,
        });
    }
};

const agregarComentario = async (req, res) => {
    try {
        const { viajeId } = req.params;
        const { comentario } = req.body;
        const userId = req.usuario.id_usuario;

        if (!comentario?.trim()) {
            return res.status(400).json({ message: "Comentario vacío" });
        }

        const insertId = await comentarioModel.createComment(
            viajeId,
            userId,
            comentario.trim(),
        );

        res.status(201).json({ message: "Comentario agregado", id: insertId });
    } catch (error) {
        console.error("Error al agregar comentario:", error);
        res.status(500).json({ message: "Error al agregar comentario", error });
    }
};

// NUEVA: actualizar comentario
const actualizarComentario = async (req, res) => {
    try {
        const { idComentario } = req.params;
        const { comentario } = req.body;
        const userId = req.usuario.id_usuario;

        if (!comentario?.trim()) {
            return res.status(400).json({ message: "Comentario vacío" });
        }

        const result = await comentarioModel.updateComment(
            idComentario,
            comentario.trim(),
        );

        if (result.affectedRows === 0) {
            return res
                .status(404)
                .json({ message: "Comentario no encontrado o no autorizado" });
        }

        res.status(200).json({
            message: "Comentario actualizado correctamente",
        });
    } catch (error) {
        console.error("Error al actualizar comentario:", error);
        res.status(500).json({
            message: "Error al actualizar comentario",
            error,
        });
    }
};

// NUEVO: Editar un comentario
const editarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const { comentario } = req.body;

        if (!comentario?.trim()) {
            return res.status(400).json({ message: "Comentario vacío" });
        }

        await comentarioModel.updateComment(id, comentario.trim());

        res.status(200).json({
            message: "Comentario actualizado correctamente",
        });
    } catch (error) {
        console.error("Error al editar comentario:", error);
        res.status(500).json({ message: "Error al editar comentario", error });
    }
};

// NUEVO: Eliminar un comentario
const eliminarComentario = async (req, res) => {
    try {
        const { id } = req.params;

        await comentarioModel.deleteComment(id);

        res.status(200).json({ message: "Comentario eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar comentario:", error);
        res.status(500).json({
            message: "Error al eliminar comentario",
            error,
        });
    }
};

module.exports = {
    obtenerComentarios,
    agregarComentario,
    editarComentario,
    eliminarComentario,
};
