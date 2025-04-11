const router = require("express").Router();

const { getAll } = require("../../controllers/usuarios.controller");

router.get("/", getAll);

module.exports = router;
