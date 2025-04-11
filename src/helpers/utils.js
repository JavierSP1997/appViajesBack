//ultimo cajon donde guardo funcioncitas de asistencia que no pertenencen puntualmente en ningun lado
const jwt = require("jsonwebtoken"); // npm install jsonwebtoken - Genera y verifica tokens JWT para autenticación.

const createToken = (usuario) => {
  const obj = {
    id: usuario.id,
  };
  return jwt.sign(obj, "fideos fritos");
  //alimentamos con el payload(el objeto creado con la data de usuario necesaria, y un string como filtro codificador)
};

module.exports = { createToken };
