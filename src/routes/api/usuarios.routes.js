const router = require("express").Router();

const {
    register,
    updateUser,
    remove,
} = require("../../controllers/usuarios.controller");
const { checkUsuarioId } = require("../../middleware/usuario.middleware");

router.post("/", register);

router.put("/:usuarioId", checkUsuarioId, updateUser);
router.delete("/:usuarioId", remove);

module.exports = router;
