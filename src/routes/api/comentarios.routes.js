const router = require("express").Router();
const {
    obtenerComentarios,
    agregarComentario,
    eliminarComentario,
    editarComentario,
} = require("../../controllers/comentarios.controller");
const { checkToken } = require("../../middleware/auth.middlewares");

router.get("/:viajeId", obtenerComentarios);

router.post("/:viajeId", checkToken, agregarComentario);

router.put("/:viajeId/:comentarioId", checkToken, editarComentario);

router.delete("/:viajeId/:comentarioId", checkToken, eliminarComentario);

module.exports = router;
