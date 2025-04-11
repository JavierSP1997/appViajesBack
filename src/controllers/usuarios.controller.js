const usuariosModel = require("../models/usuarios.model");
const { createToken } = require("../helpers/utils");
const bcrypt = require("bcryptjs"); //npm install bcryptjs = Tiene 2 funciones que nos sirven: hash y compare

const getAll = async (req, res, next) => {
  try {
    const clientes = await usuariosModel.selectAll();
    res.json(clientes);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  //req.body = {email, password}
  // ¿Está el email en la bd?
  const usuario = await usuariosModel.selectByEmail(req.body.email);
  if (!usuario) {
    return res.status(401).json({ message: "Error en usuario y/o password" });
  }

  //a partir de aqui tengo usuario(objeto con usuario y contraseña del db) y el req.body (usuario y contraseña dados)
  //¿Coinciden las passwords?
  //usuario.password (encriptada/hasheada traida del db) - req.body.password(sin encriptar - tipeada en el login)
  const iguales = bcrypt.compareSync(req.body.password, usuario.password);
  if (!iguales) {
    return res.status(401).json({ message: "Error en usuario y/o password" });
  }
  //a partir de aqui: *email existe *contraseña comparada y correcta.
  //EXITO
  //otorgamos un token de ingreso
  res.json({ message: "Login correcto", token: createToken(usuario) });
};

module.exports = { getAll, login };
