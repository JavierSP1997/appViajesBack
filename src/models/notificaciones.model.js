const db = require("../config/db.config");

const insert = async (idUsuario, idViaje, mensaje, tipo) => {
  console.log("Notificación insertada")
  const [result] = await db.query(
    "INSERT INTO notificaciones (id_usuario, id_viaje, mensaje, tipo, estado) VALUES (?, ?, ?, ?, 'no_leído')",
    [idUsuario, idViaje, mensaje, tipo]
  );
  console.log("Insertando notificación con:", { idUsuario, idViaje, mensaje, tipo });

  return result;
};
//como se repite el select se hace una const
const selectByUsuario = async (usuarioId) => {
  const query = "SELECT * FROM notificaciones WHERE id_usuario = ?";
  const [result] = await db.query(query, [usuarioId]);
  return result;
};

const selectById = async (idNotifiacion) => {
  const query = "SELECT * FROM notificaciones WHERE id_notificacion = ?";
  const [result] = await db.query(query, [idNotifiacion]);
  return result;
};

const selectByIdsViaje = async (ids_viaje) => {
  if (ids_viaje.length === 0) return [];
  const placeholders = ids_viaje.map(() => '?').join(', ');
  const query = `SELECT * FROM notificaciones WHERE id_viaje IN (${ids_viaje})`;
  const [result] = await db.query(query, ids_viaje);
  return result;
};

const update = async (id_notificacion, mensaje, tipo, estado) => {
  const query = `
    UPDATE notificaciones
    SET mensaje = ?, 
        tipo = ?, 
        estado = ?
    WHERE id_notificacion = ?
  `;
  const [result] = await db.query(query, [mensaje, tipo, estado, id_notificacion]);
  return result;
};


module.exports = { selectByUsuario,insert, selectByIdsViaje, update, selectById};

