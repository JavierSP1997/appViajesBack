const participantesModel = require("../models/participantes.model");
const viajesModel = require("../models/viajes.model");
// Esto sirve para añadir un participante a un viaje
// El id del usuario llega porque en el routes usamos el checkToken middleware
const participar = async (req, res, next) => {
    const idUsuario = req.usuario.id_usuario;
    const idViaje = req.params.viajeId;
    console.log(`Id de usuario: ${idUsuario}, id del viaje: ${idViaje}`);
    try {
      const viaje = await viajesModel.selectById(idViaje);
      if (!viaje) return res.status(404).json(); 
      await participantesModel.insert(idUsuario, idViaje, 'pendiente');
      res.json(); 
    } catch (error) {
      next(error);
    }
  };

  const abandonar = async (req, res) => {
    const idUsuario = req.usuario.id_usuario;
    const idViaje = req.params.viajeId;
  
    try {
      console.log("Intentando abandonar viaje", { idViaje, idUsuario });
  
      const resultado = await participantesModel.deleteByUsuarioAndViaje(idUsuario, idViaje);
      
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ message: "No estabas apuntado a este viaje" });
      }
      res.status(200).json({ message: "Has abandonado el viaje con éxito" });
    } catch (err) {
      res.status(500).json({ message: "Error al abandonar el viaje" });
    }
  };

module.exports = { participar, abandonar };
