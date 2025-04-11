const usuariosModel = require("../models/usuarios.model");
const getAll = async (req, res, next) => {
    try {
        const clientes = await usuariosModel.selectAll();
        res.json(clientes);
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    try {
        const result = await usuariosModel.insert(req.body);
        const usuario = await usuariosModel.selectById(result.insertId);
        res.json(usuario);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAll, register };
