const router = require("express").Router();

const {
    getAll,
    remove,
    register,
} = require("../../controllers/usuarios.controller");

router.get("/", getAll);
router.post("/", register);

router.delete("/:usuarioId", remove);

module.exports = router;
