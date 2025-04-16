const db = require("../config/db.config");

const insert = async ({ nombre, email, password, imagen, descripcion, gender, hobbies, pets }) => {
  const [result] = await db.query(
    "INSERT INTO usuarios (nombre, email, password, imagen, descripcion, gender, hobbies, pets) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [nombre, email, password, imagen, descripcion, gender, hobbies, pets]
  );
  return result;
};
const selectAll = async () => {
  const [result] = await db.query("select * from usuarios");
  return result;
};

const selectById = async (usuarioId) => {
  const [result] = await db.query(
    "select * from usuarios where id_usuario = ?",
    [usuarioId]
  );
  if (result.length === 0) return null;
  return result[0];
};

const selectByEmail = async (email) => {
  const [result] = await db.query("select * from usuarios where email = ?", [
    email,
  ]);
  if (result.length === 0) return null;
  return result[0];
};

const updateById = async (usuarioId, { nombre, email, password, imagen, descripcion,gender, hobbies, pets }) => {
  const [result] = await db.query(
    `UPDATE usuarios 
    SET nombre = ?, email = ?, password = ?, imagen = ?, descripcion = ?, gender = ?, hobbies = ?, pets = ?
    WHERE id_usuario = ?`,
   [nombre, email, password, imagen, descripcion, gender, hobbies, pets, usuarioId]
  );
  const [updated] = await db.query("SELECT * FROM usuarios WHERE id_usuario = ?", [usuarioId]);

  const usuario = updated[0];

  return {
    id: usuario.id_usuario,
    nombre: usuario.nombre,
    email: usuario.email,
    password: usuario.password,
    fecha_registro: usuario.fecha_registro,
    imagen: usuario.imagen,
    descripcion: usuario.descripcion,
    gender: usuario.gender,
    hobbies: usuario.hobbies, 
    pets: usuario.pets
  };
};

const deleteById = async (usuariosId) => {
  const id = Number(usuariosId);
  const [result] = await db.query("DELETE FROM usuarios WHERE id_usuario = ?", [
    id,
  ]);
  return result;
};

module.exports = {
  selectAll,
  selectById,
  selectByEmail,
  insert,
  updateById,
  deleteById,
};
