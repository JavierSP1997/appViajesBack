const router = require("express").Router();
const { checkToken } = require("../../middleware/auth.middlewares");
const {
  getAllViajes,
  getViajeById,
  registerViaje,
  updateViaje,
  removeViaje,
} = require("../../controllers/viajes.controller");

router.get("/", getAllViajes);
router.get("/:viajeId", getViajeById);
router.post("/nuevo", checkToken, registerViaje);
router.put("/:viajeId", checkToken, updateViaje);
router.delete("/:viajeId", checkToken, removeViaje);

module.exports = router;
