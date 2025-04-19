const db = require("../config/db.config");

// Obtener todas las reviews
const getAllReviews = async () => {
    const [rows] = await db.query("SELECT * FROM reviews");
    return rows;
};

// Obtener una review por su ID
const getReviewById = async (id) => {
    const [rows] = await db.query("SELECT * FROM reviews WHERE id_review = ?", [
        id,
    ]);
    return rows[0];
};

// Obtener reviews por ID de viaje
const getReviewsByViajeId = async (viajeId) => {
    const [rows] = await db.query(
        "SELECT * FROM reviews WHERE viajes_id_viaje = ?",
        [viajeId],
    );
    return rows;
};

// (Opcional) Obtener reviews por ID de viaje incluyendo nombre del usuario
const getReviewsByViajeWithUsuario = async (viajeId) => {
    const [rows] = await db.query(
        `
    SELECT r.id_review, r.puntuacion, r.review, r.fecha,
           u.id_usuario, u.nombre AS nombre_usuario
    FROM reviews r
    JOIN usuarios u ON r.usuarios_id_usuario = u.id_usuario
    WHERE r.viajes_id_viaje = ?
    ORDER BY r.fecha DESC
  `,
        [viajeId],
    );
    return rows;
};

// Crear una nueva review
const createReview = async (
    usuarios_id_usuario,
    viajes_id_viaje,
    puntuacion,
    review,
    fecha,
) => {
    const [result] = await db.query(
        "INSERT INTO reviews (usuarios_id_usuario, viajes_id_viaje, puntuacion, review, fecha) VALUES (?, ?, ?, ?, ?)",
        [usuarios_id_usuario, viajes_id_viaje, puntuacion, review, fecha],
    );
    return result.insertId;
};

// Actualizar una review
const updateReview = async (id_review, puntuacion, review, fecha) => {
    await db.query(
        "UPDATE reviews SET puntuacion = ?, review = ?, fecha = ? WHERE id_review = ?",
        [puntuacion, review, fecha, id_review],
    );
};

// Eliminar una review
const deleteReview = async (id_review) => {
    await db.query("DELETE FROM reviews WHERE id_review = ?", [id_review]);
};

module.exports = {
    getAllReviews,
    getReviewById,
    getReviewsByViajeId,
    getReviewsByViajeWithUsuario, // <- opcional si querés incluir nombre del usuario
    createReview,
    updateReview,
    deleteReview,
};
