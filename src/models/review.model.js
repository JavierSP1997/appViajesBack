const db = require("../config/db.config");

// Obtener todas las reviews
const getAllReviews = async () => {
    const [rows] = await db.query("SELECT * FROM review");
    return rows;
};

// Obtener una review por su ID
const getReviewsByViajeId = async (viajeId) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM review WHERE viajes_id_viaje = ?",
            [viajeId],
        );
        return rows;
    } catch (error) {
        console.error("Error en la consulta SQL: ", error); // Agregar más detalles
        throw new Error("Error al obtener las reviews del viaje");
    }
};

const getReviewsByViajeWithUsuario = async (viajeId) => {
    const [rows] = await db.query(
        `
        SELECT r.id_review, r.puntuacion, r.review, r.fecha,
               u.id_usuario AS usuarios_id_usuario, u.nombre AS nombre_usuario
        FROM review r
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
    try {
        const [result] = await db.query(
            "INSERT INTO review (usuarios_id_usuario, viajes_id_viaje, puntuacion, review, fecha) VALUES (?, ?, ?, ?, ?)",
            [usuarios_id_usuario, viajes_id_viaje, puntuacion, review, fecha],
        );
        return result.insertId; // Devuelve el ID de la nueva review insertada
    } catch (error) {
        console.error("Error al insertar la review: ", error); // Más detalles del error
        throw new Error("Error al insertar la review");
    }
};

// Actualizar una review
const updateReview = async (id_review, puntuacion, review, fecha) => {
    await db.query(
        "UPDATE review SET puntuacion = ?, review = ?, fecha = ? WHERE id_review = ?",
        [puntuacion, review, fecha, id_review],
    );
};

// Eliminar una review
const deleteReview = async (id_review) => {
    await db.query("DELETE FROM review WHERE id_review = ?", [id_review]);
};

module.exports = {
    getAllReviews,
    getReviewsByViajeId,
    getReviewsByViajeWithUsuario, // <- opcional si querés incluir nombre del usuario
    createReview,
    updateReview,
    deleteReview,
};
