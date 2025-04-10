const db = require('../config/db');

const entrenadoresController = {
    getAllEntrenadores: async (req, res) => {
        try {
            // Simplified query without WHERE clause first
            const entrenadores = await db.all(`
                SELECT e.id, e.nombre, e.apellido, e.telefono, e.correo, 
                       e.id_rol, r.nombre_rol
                FROM entrenadores e
                JOIN roles r ON e.id_rol = r.id
            `);
            res.json(entrenadores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getEntrenadorById: async (req, res) => {
        try {
            const { id } = req.params;
            const entrenador = await db.all(`
                SELECT entrenadores.*, roles.nombre_rol
                FROM entrenadores
                JOIN roles ON entrenadores.id_rol = roles.id
                WHERE entrenadores.id = ? AND entrenadores.estado = 1
            `, [id]);
            
            if (!entrenador) {
                return res.status(404).json({ message: 'Entrenador no encontrado' });
            }
            res.json(entrenador);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createEntrenador: async (req, res) => {
        try {
            const { nombre, apellido, telefono, correo, id_rol } = req.body;
            
            const result = await db.run(`
                INSERT INTO entrenadores (
                    nombre, apellido, telefono, correo, id_rol, estado
                ) VALUES (?, ?, ?, ?, ?, 1)
            `, [nombre, apellido, telefono, correo, id_rol]);
            
            res.status(201).json({ 
                id: result.lastID,
                ...req.body,
                estado: 1
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateEntrenador: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, apellido, telefono, correo } = req.body;
            
            const result = await db.run(`
                UPDATE entrenadores 
                SET nombre = ?, apellido = ?, telefono = ?, correo = ?
                WHERE id = ? AND estado = 1
            `, [nombre, apellido, telefono, correo, id]);
            
            if (result.changes === 0) {
                return res.status(404).json({ message: 'Entrenador no encontrado' });
            }
            
            res.json({ 
                id: parseInt(id),
                ...req.body
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteEntrenador: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.run(`
                UPDATE entrenadores 
                SET estado = 0 
                WHERE id = ?
            `, [id]);
            
            if (result.changes === 0) {
                return res.status(404).json({ message: 'Entrenador no encontrado' });
            }
            
            res.json({ message: 'Entrenador eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getProgramacionEntrenador: async (req, res) => {
        try {
            const { id } = req.params;
            const programacion = await db.all(`
                SELECT p.*, s.nombre_servicio
                FROM programacion p
                JOIN servicios s ON p.id_servicio = s.id
                WHERE p.id_entrenador = ? AND p.estado = 1
            `, [id]);
            
            res.json(programacion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = entrenadoresController;