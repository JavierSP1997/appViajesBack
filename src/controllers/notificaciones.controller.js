const notificacionesModel = require("../models/notificaciones.model");
const viajesModel = require("../models/viajes.model");

const obtenerNotificaciones = async (req, res) => {
  const usuarioId = req.usuario.id_usuario;

  try {
    const misViajesCreados = await viajesModel.selectByUsuarioId(usuarioId);
    const misViajesCreadosIds = misViajesCreados.map(v => { return v.id_viaje });
    const notificaciones = await notificacionesModel.selectByIdsViaje(misViajesCreadosIds);


    if (notificaciones.length === 0) {
      return res.status(404).json({ message: "No tienes notificaciones." });
    }
    res.json(notificaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las notificaciones." });
  }
};

module.exports = { obtenerNotificaciones };

