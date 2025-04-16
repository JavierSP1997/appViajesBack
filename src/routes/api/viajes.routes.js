const router = require("express").Router();
const {
    getAllViajes,
    getViajeById,
    registerViaje,
    updateViaje,
    removeViaje,
} = require("../../controllers/viajes.controller");

router.get("/", getAllViajes);
router.get("/:viajeId", getViajeById);
router.post("/nuevo", registerViaje);
router.put("/:viajeId", updateViaje);
router.delete("/:viajeId", removeViaje);

module.exports = router;
