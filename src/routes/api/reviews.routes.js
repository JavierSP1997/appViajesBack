const router = require("express").Router();

const {
    getAll,
    getByViaje,
    create,
    update,
    remove,
} = require("../../controllers/review.controller");

// Si en el futuro querés proteger rutas, podés usar estos middlewares:
// const { checkToken } = require("../../middleware/auth.middlewares");
// const { checkReviewId } = require("../../middleware/review.middleware"); // si lo creás

// Obtener todas las reviews
router.get("/", getAll);

// Obtener reviews por ID de viaje con nombre de usuario
router.get("/viaje/:viajeId", getByViaje);

// Crear una nueva review
router.post("/", create);

// Actualizar una review
router.put("/:id", update);

// Eliminar una review
router.delete("/:id", remove);

module.exports = router;
