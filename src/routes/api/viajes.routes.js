const router = require("express").Router();
const { checkToken } = require("../../middleware/auth.middlewares");
const {
    getAllViajes,
    getViajesByUsuarioId,
    getViajeById,
    registerViaje,
    updateViaje,
    removeViaje,
    finalizarViaje
} = require("../../controllers/viajes.controller");

router.get("/", getAllViajes);
router.get("/usuario/:idUsuario", getViajesByUsuarioId);
router.get("/:viajeId", getViajeById);
router.post("/nuevo", checkToken, registerViaje);
router.put("/:viajeId", checkToken, updateViaje);
router.put('/:id_viaje/finalizar', finalizarViaje);
router.delete("/:id_viaje", checkToken, removeViaje);

module.exports = router;
