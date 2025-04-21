const router = require("express").Router();
const {
    obtenerComentarios,
    agregarComentario,
    editarComentario,
    eliminarComentario,
} = require("../../controllers/comentarios.controller");
const { checkToken } = require("../../middleware/auth.middlewares");

router.get("/:viajeId", obtenerComentarios);
router.post("/:viajeId", checkToken, agregarComentario);
router.put("/:idComentario", checkToken, editarComentario);
router.delete("/:idComentario", checkToken, eliminarComentario);

module.exports = router;
