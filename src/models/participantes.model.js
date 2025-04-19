const db = require("../config/db.config");

//Método génerico para insertar participantes. 
// No necesita nada más que idUsuario/idViaje/status y nunca pasarle otras cosas.. tipo una petición o alguna mierda así //
const insert = async (idUsuario, idViaje, status ) => {

  const [result] = await db.query(
    "INSERT INTO participantes (id_usuario, id_viaje, status) VALUES (?, ?, ?)",
    [idUsuario, idViaje, status]
  );
  return result;
};
module.exports = {insert};
