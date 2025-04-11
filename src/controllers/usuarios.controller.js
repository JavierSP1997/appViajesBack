const usuariosModel = require("../models/usuarios.model");

const getAll = async (req, res, next) => {
  try {
    const clientes = await usuariosModel.selectAll();
    res.json(clientes);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { usuarioId } = req.params;
  console.log("¿¿???recibeee:", usuarioId);
  try {
    const usuario = await usuariosModel.selectId(usuarioId);
    const result = await usuariosModel.deleteById(usuarioId);
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, remove };
