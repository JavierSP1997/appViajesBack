const router = require("express").Router();

const { getAll, updateUser } = require("../../controllers/usuarios.controller");
const { checkUsuarioId } = require("../../middleware/usuario.middleware");

router.get("/", getAll);
router.put("/:usuarioId", checkUsuarioId, updateUser);

module.exports = router;
