const usuariosModel = require("../models/usuarios.model");

const getAll = async (req, res, next) => {
    try {
        const usuario = await usuariosModel.selectAll();
        res.json(usuario);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    const { usuarioId } = req.params;
    try {
        const result = await usuariosModel.updateById(usuarioId, req.body);
        const usuario = await usuariosModel.selectId(usuarioId);
        res.json(usuario);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAll, updateUser };
