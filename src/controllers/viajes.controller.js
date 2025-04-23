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
        const creados = await viajesModel.selectByUsuarioId(idUsuario);
        const participados = await viajesModel.selectParticipadosPorUsuario(idUsuario);

        const creadosIds = creados.map(v => v.id_viaje);
        const soloParticipados = participados.filter(v => !creadosIds.includes(v.id_viaje));
    
        const viajes = [...creados, ...soloParticipados];
    
        for (const viaje of viajes) {
            const participantes = await viajesModel.selectParticipantesByViajeId(viaje.id_viaje);
            viaje.participantes = participantes;
        }
    
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
        const idViaje = req.params.id_viaje;
        const idUsuario = req.usuario.id_usuario;

        const viaje = await viajesModel.selectById(idViaje);

        if (!viaje || viaje.length === 0) {
            return res.status(404).json({ message: "Viaje no encontrado" });
        }

        if (viaje[0].usuarios_id_usuario !== idUsuario) {
            return res.status(403).json({ message: "No tienes permiso para eliminar este viaje" });
        }

        const deleted = await viajesModel.deleteById(idViaje);
        if (deleted) {
            res.json({ message: "Viaje eliminado con éxito" });
        } else {
            res.status(500).json({ message: "Error al eliminar el viaje" });
        }
    
        } catch (error) {
        next(error);
        }
};


const finalizarViaje = async (req, res, next) => {
    const { id_viaje } = req.params; // Obtén el ID del viaje desde los parámetros de la ruta

    try {
        // Verificamos si el viaje existe
        const viaje = await viajesModel.selectById(id_viaje);

        if (!viaje || viaje.length === 0) {
            return res.status(404).json({ message: "Viaje no encontrado" });
        }

        // Actualizamos el estado del viaje a "finalizado"
        const estadoActualizado = await viajesModel.updateEstadoById(id_viaje, 'finalizado');

        if (estadoActualizado) {
            res.json({ message: "El viaje ha sido finalizado correctamente" });
        } else {
            res.status(400).json({ message: "No se pudo actualizar el estado del viaje" });
        }
    } catch (error) {
        next(error); // Manejo de errores
    }
};

module.exports = {
    getAllViajes,
    getViajesByUsuarioId,
    getViajeById,
    registerViaje,
    updateViaje,
    removeViaje,
    finalizarViaje
};
