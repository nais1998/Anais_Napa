import mongoose from "mongoose";
import Viajes from "../models/Viaje.models.js";

export const getAllViaje = async (req, res) => {
    console.log('traer todos los viajes')
    try {
        const viajes = await Viajes.find({}, { __v: 0 })
        if (viajes.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron viajes'
            });
        }
        return res.status(200).json({
            viajes
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener los ejemplos'
        });
    }
}

export const getIDViaje = async (req, res) => {
    console.log('traer viaje por id');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }

        const viaje = await Viajes.findById(id);
        if (!viaje) {
            return res.status(404).json({
                msg: 'viaje no encontrado'
            });
        }
        return res.status(200).json({
            viaje
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener el viaje'
        });
    }
}

export const postViaje = async (req, res) => {
    console.log('Ingresar viaje');
    const body = req.body;
    const viaje = new Viajes(body);
    try {
        const validationError = viaje.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(error => error.message);
            return res.status(400).json({
                error: errorMessages
            });
        }
        await viaje.save();
        return res.status(201).json({
            viaje
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al guardar el viaje'
        });
    }
}

export const putViaje = async (req, res) => {
    console.log('Actualizar el viaje')
    const id = req.params.id;
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const viaje = await Viajes.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!viaje) {
            return res.status(404).json({
                msg: 'Viaje no encontrado'
            });
        }

        return res.status(200).json({
            viaje
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al actualizar el viaje'
        });
    }
}

export const deleteViaje = async (req, res) => {
    console.log('Borrar el viaje por id');
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                msg: 'ID no valido'
            });
        }
        const viaje = await Viajes.findByIdAndDelete(id);
        if(!viaje){
            return res.status(404).json({
                msg: 'viaje no encontrado'
            });
        }
        return res.status(200).json({
            msgg: 'viaje eliminado',
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al eliminar el viaje'
        });
    }
}