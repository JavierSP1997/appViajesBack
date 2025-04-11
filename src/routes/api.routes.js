const { checkToken } = require("../middlewares/auth.middlewares");

const router = require("express").Router();

router.use("/usuarios", require("./api/usuarios.routes"));

/* router.use("/clientes", checkToken, require("./api/clientes.routes")); ruta de referencia para recordar de incluir webtoken en el paso a area  privada*/

module.exports = router;
