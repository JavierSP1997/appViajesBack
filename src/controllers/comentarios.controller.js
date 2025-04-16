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
        const { usuarios_id_usuario, comentario } = req.body;

        if (!usuarios_id_usuario || !comentario?.trim()) {
            return res.status(400).json({ message: "Datos incompletos" });
        }

        const insertId = await Comentario.createComment(
            viajeId,
            usuarios_id_usuario,
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
