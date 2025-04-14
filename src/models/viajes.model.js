const db = require("../config/db.config");

const selectAll = async () => {
    console.log("pasa por el modelo");
    const [result] = await db.query("select * from viajes");
    return result;
};

module.exports = { selectAll };
