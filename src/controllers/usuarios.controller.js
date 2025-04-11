const usuariosModel = require("../models/usuarios.model");

const register = async (req, res, next) => {
    try {
        const result = await usuariosModel.insert(req.body);
        const usuario = await usuariosModel.selectById(result.insertId);
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

const remove = async (req, res, next) => {
    const { usuarioId } = req.params;
    try {
        const usuario = await usuariosModel.selectId(usuarioId);
        const result = await usuariosModel.deleteById(usuarioId);
        res.json(usuario);
    } catch (error) {
        next(error);
    }
};

module.exports = { register, updateUser, remove };
