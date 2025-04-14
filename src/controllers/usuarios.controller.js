const usuariosModel = require("../models/usuarios.model");
const { createToken } = require("../helpers/utils");
const bcrypt = require("bcryptjs"); //npm install bcryptjs = Tiene 2 funciones que nos sirven: hash y compare

const register = async (req, res, next) => {
  console.log("pass sin encriptar:", req.body.password);

  req.body.password = bcrypt.hashSync(req.body.password, 8); //Salt: dificultad del encriptado de password, usar entre 8 y 12 de dificultad

  console.log("pass encriptada:", req.body.password);

  try {
    const result = await usuariosModel.insert(req.body);
    const usuario = await usuariosModel.selectById(result.insertId);
    res.json(usuario);
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

const updateUser = async (req, res, next) => {
  const { usuarioId } = req.params;
  try {
    const result = await usuariosModel.updateById(usuarioId, req.body);
    const usuario = await usuariosModel.selectById(usuarioId);
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { usuarioId } = req.params;
  try {
    const usuario = await usuariosModel.selectById(usuarioId);
    const result = await usuariosModel.deleteById(usuarioId);
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  const { usuarioId } = req.params;
  try {
    const usuario = await usuariosModel.selectById(usuarioId);
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, updateUser, remove, getOne };
