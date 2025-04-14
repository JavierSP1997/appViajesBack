const db = require("../config/db.config");

const insert = async ({
  nombre_viaje,
  fecha_inicio,
  fecha_fin,
  coste_por_persona,
  personas_minimas,
  localizacion,
  itinerario,
  imagen,
}) => {
  const [result] = await db.query(
    "INSERT INTO viajes (nombre_viaje, fecha_inicio, fecha_fin, coste_por_persona, personas_minimas, localizacion, itinerario, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nombre_viaje,
      fecha_inicio,
      fecha_fin,
      coste_por_persona,
      personas_minimas,
      localizacion,
      itinerario,
      imagen,
    ]
  );
  return result;
};

const selectAll = async () => {
  console.log("pasa por el modelo");
  const [result] = await db.query("select * from viajes");
  return result;
};

const selectById = async (viajeId) => {
  const [result] = await db.query("SELECT * FROM viajes WHERE id_viaje = ?", [
    viajeId,
  ]);
  return result[0];
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
    ]
  );
  return result.affectedRows > 0;
};

const deleteById = async (viajeId) => {
  const [result] = await db.query("DELETE FROM viajes WHERE id_viaje = ?", [
    viajeId,
  ]);
  return result.affectedRows > 0;
};

module.exports = { insert, selectAll, selectById, updateById, deleteById };
