const router = require("express").Router();
const {participar, abandonar, actualizarEstado} = require("../../controllers/participantes.controller");
const {checkToken} = require("../../middleware/auth.middlewares")


router.post("/participar/:viajeId", checkToken, participar);
router.delete("/abandonar/:viajeId", checkToken, abandonar
);
router.put("/:usuarioId/viaje/:viajeId", checkToken, actualizarEstado )

module.exports = router;
