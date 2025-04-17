const router = require("express").Router();
const {
    obtenerComentarios,
    agregarComentario,
} = require("../../controllers/comentarios.controller");
const { checkToken } = require("../../middleware/auth.middlewares");

// Obtener comentarios de un viaje
router.get("/viajes/:viajeId/comentarios", obtenerComentarios);

// Agregar un nuevo comentario a un viaje
router.post("/viajes/:viajeId/comentarios", checkToken, agregarComentario);

module.exports = router;
