const router = require("express").Router();
const {
    obtenerComentarios,
    agregarComentario,
} = require("../../controllers/comentarios.controller");

// Obtener comentarios de un viaje
router.get("/viajes/:viajeId/comentarios", obtenerComentarios);

// Agregar un nuevo comentario a un viaje
router.post("/viajes/:viajeId/comentarios", agregarComentario);

module.exports = router;
