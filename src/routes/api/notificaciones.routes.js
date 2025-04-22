const router = require("express").Router();
const { obtenerNotificaciones } = require("../../controllers/notificaciones.controller");
const { checkToken } = require("../../middleware/auth.middlewares");

router.get("/", checkToken, obtenerNotificaciones);

module.exports = router;
