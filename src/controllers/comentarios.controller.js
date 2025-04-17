const Comentario = require("../models/comentarios.model");

const obtenerComentarios = async (req, res) => {
    try {
        const { viajeId } = req.params;
        const comentarios = await Comentario.getByViajeId(viajeId);
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
        const userId = req.usuario.id_usuario; // ← este es el ID del token

        if (!comentario?.trim()) {
            return res.status(400).json({ message: "Comentario vacío" });
        }

        const insertId = await Comentario.createComment(
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

module.exports = {
    obtenerComentarios,
    agregarComentario,
};
