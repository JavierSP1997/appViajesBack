const comentarioModel = require("../models/comentarios.model");

const obtenerComentarios = async (req, res) => {
    try {
        const { viajeId } = req.params;
        const comentarios = await comentarioModel.getByViajeId(viajeId);

        if (!comentarios.length) {
            return res
                .status(404)
                .json({ message: "No se encontraron comentarios" });
        }

        res.json(comentarios);
    } catch (error) {
        console.error("Error al obtener comentarios:", error);
        res.status(500).json({
            message: "Error al obtener los comentarios",
            error: error.message || "Error interno del servidor",
        });
    }
};

const agregarComentario = async (req, res) => {
    try {
        const { viajeId } = req.params;
        const { comentario } = req.body;
        const userId = req.usuario.id_usuario;

        // Validación de comentario
        if (!comentario?.trim()) {
            return res.status(400).json({ message: "Comentario vacío" });
        }
        if (comentario.trim().length < 3) {
            return res
                .status(400)
                .json({ message: "Comentario demasiado corto" });
        }

        const insertId = await comentarioModel.createComment(
            viajeId,
            userId,
            comentario.trim(),
        );

        res.status(201).json({ message: "Comentario agregado", id: insertId });
    } catch (error) {
        console.error("Error al agregar comentario:", error);
        res.status(500).json({
            message: "Error al agregar comentario",
            error: error.message,
        });
    }
};

const editarComentario = async (req, res) => {
    try {
        const { comentarioId } = req.params;
        const { comentario } = req.body;
        const usuarioId = req.usuario.id_usuario;

        // Validación de comentario
        if (!comentario?.trim()) {
            return res.status(400).json({ message: "Comentario vacío" });
        }
        if (comentario.trim().length < 3) {
            return res
                .status(400)
                .json({ message: "Comentario demasiado corto" });
        }

        const actualizado = await comentarioModel.updateComment(
            comentarioId,
            usuarioId,
            comentario.trim(),
        );

        if (!actualizado.success) {
            return res
                .status(404)
                .json({ message: "Comentario no encontrado o no autorizado" });
        }

        res.json({ message: "Comentario actualizado con éxito" });
    } catch (error) {
        console.error("Error al editar comentario:", error);
        res.status(500).json({
            message: "Error al editar comentario",
            error: error.message,
        });
    }
};

const eliminarComentario = async (req, res) => {
    try {
        const { comentarioId } = req.params;
        const usuarioId = req.usuario.id_usuario;

        const eliminado = await comentarioModel.deleteComment(
            comentarioId,
            usuarioId,
        );

        if (!eliminado.success) {
            return res
                .status(404)
                .json({ message: "Comentario no encontrado o no autorizado" });
        }

        res.json({ message: "Comentario eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar comentario:", error);
        res.status(500).json({
            message: "Error al eliminar comentario",
            error: error.message,
        });
    }
};

module.exports = {
    obtenerComentarios,
    agregarComentario,
    editarComentario,
    eliminarComentario,
};
