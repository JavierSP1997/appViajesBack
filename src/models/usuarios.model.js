const db = require("../config/db.config");

const selectAll = async () => {
    const [result] = await db.query("select * from usuarios");
    return result;
};

module.exports = { selectAll };
