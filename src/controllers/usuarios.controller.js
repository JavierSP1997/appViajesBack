const usuariosModel = require("../models/usuarios.model");
const getAll = async (req, res, next) => {
    try {
        const clientes = await usuariosModel.selectAll();
        res.json(clientes);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAll };
