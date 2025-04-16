const viajesModel = require("../models/viajes.model");

const getAllViajes = async (req, res, next) => {
  try {
    const viajes = await viajesModel.selectAll();
    res.json(viajes);
  } catch (error) {
    next(error);
  }
};

const getViajeById = async (req, res, next) => {
  try {
    const viajeId = req.params.viajeId;

    const viajeResult = await viajesModel.selectById(viajeId);
    const viaje = viajeResult[0];

    if (!viaje) {
      return res.status(404).json({ message: "Viaje no encontrado" });
    }

    const participantes = await viajesModel.selectParticipantesByViajeId(viajeId);

    res.json({
      ...viaje,
      participantes,
    });

  } catch (error) {
    next(error);
  }
};


const registerViaje = async (req, res, next) => {
  try {
    const newViaje = await viajesModel.insert(req.body);
    res.status(201).json({
      message: "Viaje registrado con éxito",
      id: newViaje.insertId,
    });
  } catch (error) {
    next(error);
  }
};

const updateViaje = async (req, res, next) => {
  try {
    const updated = await viajesModel.updateById({
      id: req.params.id,
      ...req.body,
    });
    if (updated) {
      res.json({ message: "Viaje actualizado con éxito" });
    } else {
      res.status(404).json({ message: "Viaje no encontrado" });
    }
  } catch (error) {
    next(error);
  }
};

const removeViaje = async (req, res, next) => {
  try {
    const deleted = await viajesModel.deleteById(req.params.id);
    if (deleted) {
      res.json({ message: "Viaje eliminado con éxito" });
    } else {
      res.status(404).json({ message: "Viaje no encontrado" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllViajes,
  getViajeById,
  registerViaje,
  updateViaje,
  removeViaje,
};
