const router = require("express").Router();
const {
    getAll,
    getByViaje,
    create,
    update,
    remove,
    getByViajeConUsuario,
} = require("../../controllers/review.controller");
const { checkToken } = require("../../middleware/auth.middlewares");

// Rutas públicas
router.get("/", getAll);
router.get("/viaje/:viajeId", getByViaje);
router.get("/viaje/:viajeId/usuario", getByViajeConUsuario);

// Rutas protegidas
router.post("/", checkToken, create);
router.put("/:id", checkToken, update);
router.delete("/:id", checkToken, remove);

module.exports = router;
