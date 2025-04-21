const router = require("express").Router();
const {participar, abandonar} = require("../../controllers/participantes.controller");
const {checkToken} = require("../../middleware/auth.middlewares")


router.post("/participar/:viajeId", checkToken, participar);
router.delete("/abandonar/:viajeId", checkToken, abandonar
);
module.exports = router;
