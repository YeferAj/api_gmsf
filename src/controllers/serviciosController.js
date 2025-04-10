const db = require('../config/db');

const serviciosController = {
    getAllServicios: async (req, res) => {
        try {
            const servicios = await db.all('SELECT * FROM servicios WHERE estado = 1');
            res.json(servicios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getServicioById: async (req, res) => {
        try {
            const { id } = req.params;
            const servicio = await db.all('SELECT * FROM servicios WHERE id = ? AND estado = 1', [id]);
            
            if (!servicio) {
                return res.status(404).json({ message: 'Servicio no encontrado' });
            }
            
            res.json(servicio);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createServicio: async (req, res) => {
        try {
            const { nombre_servicio, descripcion } = req.body;
            
            const result = await db.run(
                'INSERT INTO servicios (nombre_servicio, descripcion, estado) VALUES (?, ?, 1)',
                [nombre_servicio, descripcion]
            );
            
            res.status(201).json({ 
                id: result.lastID,
                nombre_servicio,
                descripcion,
                estado: 1
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateServicio: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre_servicio, descripcion } = req.body;
            
            const result = await db.run(
                'UPDATE servicios SET nombre_servicio = ?, descripcion = ? WHERE id = ? AND estado = 1',
                [nombre_servicio, descripcion, id]
            );
            
            if (result.changes === 0) {
                return res.status(404).json({ message: 'Servicio no encontrado' });
            }
            
            res.json({ 
                id: parseInt(id),
                nombre_servicio,
                descripcion
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteServicio: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.run(
                'UPDATE servicios SET estado = 0 WHERE id = ?',
                [id]
            );
            
            if (result.changes === 0) {
                return res.status(404).json({ message: 'Servicio no encontrado' });
            }
            
            res.json({ message: 'Servicio eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getServiciosByMembresia: async (req, res) => {
        try {
            const { id } = req.params;
            const servicios = await db.all(`
                SELECT s.* 
                FROM servicios s
                JOIN membresia_servicios ms ON s.id = ms.id_servicio
                WHERE ms.id_membresia = ? AND s.estado = 1
            `, [id]);
            
            res.json(servicios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = serviciosController;