const router = require("express").Router();
const {participar} = require("../../controllers/participantes.controller");
const {checkToken} = require("../../middleware/auth.middlewares")


router.post("/participar/:viajeId", checkToken, participar);

module.exports = router;
