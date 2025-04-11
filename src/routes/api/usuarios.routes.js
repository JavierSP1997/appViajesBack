const router = require("express").Router();

const { getAll, register } = require("../../controllers/usuarios.controller");

router.get("/", getAll);
router.post("/", register);

module.exports = router;
