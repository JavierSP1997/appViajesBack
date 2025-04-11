const router = require("express").Router();
const { getAll, login } = require("../../controllers/usuarios.controller");

router.get("/", getAll); //test (a eliminar)
router.post("/login", login);

module.exports = router;
