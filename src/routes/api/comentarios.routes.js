const router = require("express").Router();
const {
    obtenerComentarios,
    agregarComentario,
} = require("../../controllers/comentarios.controller");
const { checkToken } = require("../../middleware/auth.middlewares");

router.get("/:viajeId", obtenerComentarios); // → /comentarios/:viajeId
router.post("/:viajeId", checkToken, agregarComentario); // → /comentarios/:viajeId

module.exports = router;
