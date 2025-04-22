const viajesModel = require("../models/viajes.model");
const usuariosModel = require("../models/usuarios.model");

const getAllViajes = async (req, res, next) => {
    try {
        const viajes = await viajesModel.selectAll();
        res.json(viajes);
    } catch (error) {
        next(error);
    }
};

const getViajesByUsuarioId = async (req, res) => {
    const { idUsuario } = req.params;

    try {
        const viajes = await viajesModel.selectByUsuarioId(idUsuario);

        res.status(200).json(viajes);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Error al obtener los viajes del usuario",
        });
    }
};

const getViajeById = async (req, res, next) => {
    try {
        const viajeId = req.params.viajeId;

        const viajeResult = await viajesModel.selectById(viajeId);
        const viaje = viajeResult[0];

        if (!viaje) {
            return res.status(404).json({ message: "Viaje no encontrado" });
        }

        const participantes =
            await viajesModel.selectParticipantesByViajeId(viajeId);

        // Obtener datos públicos del anfitrión directamente
        const usuario = await usuariosModel.selectById(
            viaje.usuarios_id_usuario,
        );

        const anfitrion = usuario
            ? {
                  id: usuario.id_usuario,
                  nombre: usuario.nombre,
                  email: usuario.email,
                  fecha_registro: usuario.fecha_registro,
                  imagen: usuario.imagen || null,
                  descripcion: usuario.descripcion || null,
                  gender: usuario.gender || null,
                  hobbies: usuario.hobbies || null,
                  pets: usuario.pets || null,
              }
            : null;

        res.json({
            ...viaje,
            anfitrion,
            participantes,
        });
    } catch (error) {
        next(error);
    }
};

const registerViaje = async (req, res, next) => {
    try {
        req.body.usuarios_id_usuario = req.usuario.id_usuario;
        const newViaje = await viajesModel.insert(req.body);
        res.status(201).json({
            message: "Viaje registrado con éxito",
            id_viaje: newViaje.insertId,
        });
    } catch (error) {
        next(error);
    }
};

const updateViaje = async (req, res, next) => {
    try {
        const updated = await viajesModel.updateById({
            id: req.params.id,
            ...req.body,
        });
        if (updated) {
            res.json({ message: "Viaje actualizado con éxito" });
        } else {
            res.status(404).json({ message: "Viaje no encontrado" });
        }
    } catch (error) {
        next(error);
    }
};

const removeViaje = async (req, res, next) => {
    try {
        const deleted = await viajesModel.deleteById(req.params.id_viaje);
        if (deleted) {
            res.json({ message: "Viaje eliminado con éxito" });
        } else {
            res.status(404).json({ message: "Viaje no encontrado" });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllViajes,
    getViajesByUsuarioId,
    getViajeById,
    registerViaje,
    updateViaje,
    removeViaje,
};
