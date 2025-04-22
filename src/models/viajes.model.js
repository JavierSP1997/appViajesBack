const db = require("../config/db.config");

const insert = async ({
    nombre_viaje,
    usuarios_id_usuario,
    fecha_inicio,
    fecha_fin,
    coste_por_persona,
    personas_minimas,
    localizacion,
    itinerario,
    imagen,
}) => {
    const [result] = await db.query(
        "INSERT INTO viajes (nombre_viaje, usuarios_id_usuario, fecha_inicio, fecha_fin, coste_por_persona, personas_minimas, localizacion, itinerario, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            nombre_viaje,
            usuarios_id_usuario,
            fecha_inicio,
            fecha_fin,
            coste_por_persona,
            personas_minimas,
            localizacion,
            itinerario,
            imagen,
        ],
    );
    return result;
};

const selectAll = async () => {
    const [result] = await db.query("select * from viajes");
    return result;
};

const selectById = async (viajeId) => {
    console.log("pidiendo viaje con id:", { viajeId });
    const [result] = await db.query("SELECT * FROM viajes WHERE id_viaje = ?", [
        viajeId,
    ]);
    return result;
};

const updateById = async ({
    nombre_viaje,
    fecha_inicio,
    fecha_fin,
    coste_por_persona,
    personas_minimas,
    localizacion,
    itinerario,
    imagen,
    id_viaje,
}) => {
    const [result] = await db.query(
        "UPDATE viajes SET nombre_viaje = ?, fecha_inicio = ?, fecha_fin = ?, coste_por_persona = ?, personas_minimas = ?, localizacion = ?, itinerario = ?, imagen = ? WHERE id_viaje = ?",
        [
            nombre_viaje,
            fecha_inicio,
            fecha_fin,
            coste_por_persona,
            personas_minimas,
            localizacion,
            itinerario,
            imagen,
            id_viaje,
        ],
    );
    return result.affectedRows > 0;
};

const deleteById = async (id_viaje) => {
    const [result] = await db.query("DELETE FROM viajes WHERE id_viaje = ?", [
        id_viaje,
    ]);
    console.log(result)
    return result.affectedRows > 0;
};

const selectParticipantesByViajeId = async (viajeId) => {
    const [result] = await db.query(
        `
    SELECT 
      u.id_usuario,
      u.nombre,
      u.imagen,
      p.status
    FROM participantes p
    INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
    WHERE p.id_viaje = ?
    `,
        [viajeId],
    );
    return result;
};

const selectByUsuarioId = async (idUsuario) => {
    const [result] = await db.query(
        "SELECT * FROM viajes WHERE usuarios_id_usuario = ?",
        [idUsuario],
    );
    return result;
};

module.exports = {
    insert,
    selectAll,
    selectById,
    updateById,
    deleteById,
    selectParticipantesByViajeId,
    selectByUsuarioId,
};
