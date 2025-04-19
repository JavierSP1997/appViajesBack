const router = require("express").Router();

const {
    register,
    login,
    updateUser,
    remove,
    getOne,
    getPublicOne,
    checkEmail,
} = require("../../controllers/usuarios.controller");
const { checkToken } = require("../../middleware/auth.middlewares");
const { checkUsuarioId } = require("../../middleware/usuario.middleware");

router.get("/", checkToken, getOne);
router.get("/check-email", checkEmail);
router.post("/register", register);
router.post("/login", login);
router.put("/:usuarioId", checkUsuarioId, updateUser);
router.get("/:usuarioId", checkToken, getPublicOne);
router.delete("/:usuarioId", remove);

module.exports = router;
