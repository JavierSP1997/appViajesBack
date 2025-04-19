const router = require("express").Router();
const {
    getAll,
    getByViaje,
    create,
    update,
    remove,
} = require("../../controllers/review.controller");
const { checkToken } = require("../../middleware/auth.middlewares");

// Rutas públicas
router.get("/", getAll);
router.get("/viaje/:viajeId", getByViaje);

// Rutas protegidas
router.post("/", checkToken, create);
router.put("/:id", checkToken, update);
router.delete("/:id", checkToken, remove);

module.exports = router;
