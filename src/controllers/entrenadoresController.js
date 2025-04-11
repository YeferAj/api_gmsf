const db = require('../config/db');

const entrenadoresController = {
    getAllEntrenadores: async (req, res) => {
        try {
            const entrenadores = await db.all(`
                SELECT e.id, e.especialidad, e.fecha_registro, e.estado,
                       u.nombre, u.apellido, u.correo, u.telefono
                FROM entrenadores e
                JOIN usuarios u ON e.id_usuario = u.id
                WHERE e.estado = 1
            `);
            res.json(entrenadores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getEntrenadorById: async (req, res) => {
        try {
            const { id } = req.params;
            const entrenador = await db.get(`
                SELECT e.id, e.especialidad, e.fecha_registro, e.estado,
                       u.nombre, u.apellido, u.correo, u.telefono
                FROM entrenadores e
                JOIN usuarios u ON e.id_usuario = u.id
                WHERE e.id = ? AND e.estado = 1
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
            const { id_usuario, especialidad } = req.body;
            const result = await db.run(`
                INSERT INTO entrenadores (id_usuario, especialidad, fecha_registro, estado)
                VALUES (?, ?, DATE('now'), 1)
            `, [id_usuario, especialidad]);
            
            res.status(201).json({ 
                id: result.lastID,
                id_usuario,
                especialidad,
                fecha_registro: new Date().toISOString().split('T')[0],
                estado: 1
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateEntrenador: async (req, res) => {
        try {
            const { id } = req.params;
            const { especialidad } = req.body;
            
            const result = await db.run(`
                UPDATE entrenadores 
                SET especialidad = ?
                WHERE id = ? AND estado = 1
            `, [especialidad, id]);
            
            if (result.changes === 0) {
                return res.status(404).json({ message: 'Entrenador no encontrado' });
            }
            
            res.json({ 
                id: parseInt(id),
                especialidad
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
    }
};

module.exports = entrenadoresController;