const Review = require("../models/review.model");

// Obtener todas las reviews
const getAll = async (req, res) => {
    try {
        const reviews = await Review.getAllReviews();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las reviews" });
    }
};

// Obtener reviews de un viaje específico con nombre de usuario
const getByViaje = async (req, res) => {
    const { viajeId } = req.params;
    try {
        const reviews = await Review.getReviewsByViajeId(viajeId);
        if (reviews.length === 0) {
            return res
                .status(404)
                .json({ error: "No hay reviews para este viaje" });
        }
        res.json(reviews);
    } catch (error) {
        console.error(error); // Muestra el error en la consola para más detalles
        res.status(500).json({
            error: "Error al obtener las reviews del viaje",
        });
    }
};

// Crear una nueva review
const create = async (req, res) => {
    const { usuarios_id_usuario, viajes_id_viaje, puntuacion, review, fecha } =
        req.body;

    // Verifica que todos los datos necesarios estén presentes
    if (
        !usuarios_id_usuario ||
        !viajes_id_viaje ||
        !puntuacion ||
        !review ||
        !fecha
    ) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    try {
        // Inserta la nueva review en la base de datos
        const id = await Review.createReview(
            usuarios_id_usuario,
            viajes_id_viaje,
            puntuacion,
            review,
            fecha,
        );
        res.status(201).json({ id, message: "Review creada con éxito" });
    } catch (error) {
        console.error(error); // Muestra más detalles del error
        res.status(500).json({ error: "Error al crear la review" });
    }
};

// Actualizar una review existente
const update = async (req, res) => {
    const { id } = req.params;
    const { puntuacion, review, fecha } = req.body;
    try {
        await Review.updateReview(id, puntuacion, review, fecha);
        res.json({ message: "Review actualizada con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la review" });
    }
};

// Eliminar una review
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await Review.deleteReview(id);
        res.json({ message: "Review eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la review" });
    }
};

module.exports = {
    getAll,
    getByViaje,
    create,
    update,
    remove,
};
