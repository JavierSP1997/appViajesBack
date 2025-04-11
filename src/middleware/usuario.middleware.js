const usuariosModel = require("../models/usuarios.model");

const checkUsuarioId = async (req, res, next) => {
    const { usuarioId } = req.params;

    if (isNaN(usuarioId)) {
        return res
            .status(400)
            .json({ message: "el id del usuario debe ser numerico" });
    }

    const usuario = await usuariosModel.selectId(usuarioId);
    if (!usuario) {
        return res.status(404).json({ message: "El usuario no existe" });
    }

    next();
};

module.exports = { checkUsuarioId };
