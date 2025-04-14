const router = require("express").Router();
const { getAllTrips } = require("../../controllers/viajes.controller");

router.get("/", getAllTrips);

module.exports = router;
