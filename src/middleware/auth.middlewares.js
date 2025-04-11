const jwt = require("jsonwebtoken");
const usuariosModel = require("../models/usuarios.model");

const checkToken = async (req, res, next) => {
  //console.log("Checktoken: pasamos por el middleware "); --comprobamos que el filtro funciona al mandar peticiones.

  //Realizamos comprobaciones:
  //¿El token está incluido en la petición? (el token viene en req.headers)
  if (!req.headers.authorization) {
    //si no existe la cabeceta con la autorización token...
    return res
      .status(403)
      .json({ message: "Debes incluir la cabecera Authorization" });
  }

  const token = req.headers.authorization;
  let obj;
  try {
    //¿El Token es correcto?
    obj = jwt.verify(token, "fideos fritos");
    //esta verificación decodifica el token de vuevo a un obj -> {id,rol}
    //nos da un 3º parametro "iat", timestamp de segundos desde 1970
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }

  //¿Está el usuario en la base de datos?
  console.log(obj);
  const usuario = await usuariosModel.selectById(obj.id);
  if (!usuario) {
    return res.status(403).json({ message: "El usuario no es valido" });
  }

  next();
};

module.exports = {
  checkToken,
};
