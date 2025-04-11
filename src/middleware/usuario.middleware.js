const usuariosModel = require("../models/usuarios.model");

const checkUsuarioId = async (req, res, next) => {
    const { usuarioId } = req.params;

    if (isNaN(usuarioId)) {
        return res
            .status(400)
            .json({ message: "el id del usuario debe ser numerico" });
    }

<<<<<<< HEAD
  const usuario = await usuariosModel.selectById(usuarioId);
  if (!usuario) {
    return res.status(404).json({ message: "El usuario no existe" });
  }
=======
    const usuario = await usuariosModel.selectById(usuarioId);
    if (!usuario) {
        return res.status(404).json({ message: "El usuario no existe" });
    }
>>>>>>> 30e93da58a152894caebc42c9f40b49cf52a3365

    next();
};

module.exports = { checkUsuarioId };
