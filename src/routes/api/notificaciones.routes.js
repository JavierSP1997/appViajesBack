const router = require("express").Router();
const { obtenerNotificaciones, nuevaNotificacion, actualizarNotificacion } = require("../../controllers/notificaciones.controller");
const { checkToken } = require("../../middleware/auth.middlewares");

router.get("/", checkToken, obtenerNotificaciones);
router.post("/", checkToken, nuevaNotificacion);
router.put("/:idNotificacion", checkToken, actualizarNotificacion)

module.exports = router;
