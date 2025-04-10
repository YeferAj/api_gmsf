const db = require('../config/db');

const membresiasController = {
    getAllMembresias: async (req, res) => {
        try {
            const membresias = await db.all('SELECT * FROM membresias WHERE estado = "activa"');
            res.json(membresias);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getMembresiaById: async (req, res) => {
        try {
            const { id } = req.params;
            const membresia = await db.all('SELECT * FROM membresias WHERE id = ?', [id]);
            if (!membresia) {
                return res.status(404).json({ message: 'Membresía no encontrada' });
            }
            res.json(membresia);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createMembresia: async (req, res) => {
        try {
            const { id_usuario, fecha_inicio, fecha_fin, tipo_membresia, precio } = req.body;
            const result = await db.run(
                'INSERT INTO membresias (id_usuario, fecha_inicio, fecha_fin, tipo_membresia, estado, precio) VALUES (?, ?, ?, ?, "activa", ?)',
                [id_usuario, fecha_inicio, fecha_fin, tipo_membresia, precio]
            );
            res.status(201).json({ 
                id: result.lastID,
                ...req.body,
                estado: 'activa'
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateMembresia: async (req, res) => {
        try {
            const { id } = req.params;
            const { fecha_inicio, fecha_fin, tipo_membresia, precio } = req.body;
            const result = await db.run(
                'UPDATE membresias SET fecha_inicio = ?, fecha_fin = ?, tipo_membresia = ?, precio = ? WHERE id = ?',
                [fecha_inicio, fecha_fin, tipo_membresia, precio, id]
            );
            if (result.changes === 0) {
                return res.status(404).json({ message: 'Membresía no encontrada' });
            }
            res.json({ 
                id: parseInt(id),
                ...req.body
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteMembresia: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.run(
                'UPDATE membresias SET estado = "inactiva" WHERE id = ?',
                [id]
            );
            if (result.changes === 0) {
                return res.status(404).json({ message: 'Membresía no encontrada' });
            }
            res.json({ message: 'Membresía cancelada correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = membresiasController;