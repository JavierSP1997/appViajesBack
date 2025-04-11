const router = require("express").Router();

const { getAll, remove } = require("../../controllers/usuarios.controller");

router.get("/", getAll);

router.delete("/:usuarioId", remove);

module.exports = router;
