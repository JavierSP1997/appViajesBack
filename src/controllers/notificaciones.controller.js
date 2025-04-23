const notificacionesModel = require("../models/notificaciones.model");
const viajesModel = require("../models/viajes.model");

const obtenerNotificaciones = async (req, res) => {
  const usuarioId = req.usuario.id_usuario;

  try {
    const misViajesCreados = await viajesModel.selectByUsuarioId(usuarioId);
    const misViajesCreadosIds = misViajesCreados.map((v) => {
      return v.id_viaje;
    });
    const notificaciones = await notificacionesModel.selectByIdsViaje(
      misViajesCreadosIds
    );

    if (notificaciones.length === 0) {
      return res.status(200).json([]);
    }
    res.json(notificaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las notificaciones." });
  }
};

const nuevaNotificacion  = async (req, res) => {

  try {
    const usuarioId = req.usuario.id_usuario;
    const idViaje = req.body.idViaje;
    const mensaje = req.body.mensaje;
    const tipo = '';
    const estado = req.body.estado;

    notificacionesModel.insert(usuarioId, idViaje, mensaje, tipo, estado)
    return res.status(200).json();
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al insertar notificacion." });
  }
};

module.exports = { obtenerNotificaciones, nuevaNotificacion };
