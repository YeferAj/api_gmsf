const db = require('../config/db');

const membresiasController = {
    getAllMembresias: async (req, res) => {
        try {
            const membresias = await db.all('SELECT * FROM membresias WHERE estado = 1');
            res.json(membresias);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getMembresiaById: async (req, res) => {
        try {
            const { id } = req.params;
            const membresia = await db.get('SELECT * FROM membresias WHERE id = ? AND estado = 1', [id]);
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
            const { nombre, descripcion, duracion, precio } = req.body;
            const result = await db.run(
                'INSERT INTO membresias (nombre, descripcion, duracion, precio, estado) VALUES (?, ?, ?, ?, 1)',
                [nombre, descripcion, duracion, precio]
            );
            res.status(201).json({ 
                id: result.lastID,
                nombre,
                descripcion,
                duracion,
                precio,
                estado: 1
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateMembresia: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, descripcion, duracion, precio } = req.body;
            const result = await db.run(
                'UPDATE membresias SET nombre = ?, descripcion = ?, duracion = ?, precio = ? WHERE id = ? AND estado = 1',
                [nombre, descripcion, duracion, precio, id]
            );
            if (result.changes === 0) {
                return res.status(404).json({ message: 'Membresía no encontrada' });
            }
            res.json({ 
                id: parseInt(id),
                nombre,
                descripcion,
                duracion,
                precio,
                estado: 1
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteMembresia: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.run(
                'UPDATE membresias SET estado = 0 WHERE id = ?',
                [id]
            );
            if (result.changes === 0) {
                return res.status(404).json({ message: 'Membresía no encontrada' });
            }
            res.json({ message: 'Membresía eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = membresiasController;