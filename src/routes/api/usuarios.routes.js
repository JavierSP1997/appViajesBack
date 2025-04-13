const router = require("express").Router();

const {
  register,
  login,
  updateUser,
  remove,
} = require("../../controllers/usuarios.controller");
const { checkUsuarioId } = require("../../middleware/usuario.middleware");

router.post("/register", register);
router.post("/login", login);
router.put("/:usuarioId", checkUsuarioId, updateUser);
router.delete("/:usuarioId", remove);

module.exports = router;
