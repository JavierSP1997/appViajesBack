const db = require("../config/db.config");

const selectAll = async () => {
  const [result] = await db.query("select * from usuarios");
  return result;
};

const selectByEmail = async (email) => {
  const [result] = await db.query("select * from usuarios where email = ?", [
    email,
  ]);
  if (result.length === 0) return null;
  return result[0];
};

module.exports = { selectAll, selectByEmail };
