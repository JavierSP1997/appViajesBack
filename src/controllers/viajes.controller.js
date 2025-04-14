const tripModel = require("../models/viajes.model");

const getAllTrips = async (req, res, next) => {
    console.log("pasa por el controlador");
    try {
        const trips = await tripModel.selectAll();
        res.json(trips);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllTrips };
