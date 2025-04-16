const Comentario = require("../models/comentarios.model");

const obtenerComentarios = async (req, res) => {
    try {
        const { viajeId } = req.params;
        const comentarios = await Comentario.getByViajeId(viajeId);
        res.json(comentarios);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los comentarios",
            error,
        });
    }
};

const agregarComentario = async (req, res) => {
    try {
        const { viajeId } = req.params;
        const { usuario_id, comentario } = req.body;
        const insertId = await Comentario.createComment(
            viajeId,
            usuario_id,
            comentario,
        );
        res.status(201).json({ message: "Comentario agregado", id: insertId });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar comentario", error });
    }
};

module.exports = {
    obtenerComentarios,
    agregarComentario,
};
