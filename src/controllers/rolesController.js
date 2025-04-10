const db = require('../config/db');

const rolesController = {
    getAllRoles: async (req, res) => {
        try {
            const roles = await db.all(`
                SELECT * FROM roles 
                WHERE estado = 1
            `);
            res.json(roles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getRolById: async (req, res) => {
        try {
            const { id } = req.params;
            const rol = await db.get(`
                SELECT * FROM roles 
                WHERE id = ? AND estado = 1
            `, [id]);
            
            if (!rol) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            res.json(rol);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createRol: async (req, res) => {
        try {
            const { nombre_rol, descripcion } = req.body;
            const result = await db.run(`
                INSERT INTO roles (nombre_rol, descripcion, estado)
                VALUES (?, ?, 1)
            `, [nombre_rol, descripcion]);
            
            res.status(201).json({ 
                id: result.lastID,
                nombre_rol,
                descripcion,
                estado: 1
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateRol: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre_rol, descripcion } = req.body;
            
            const result = await db.run(`
                UPDATE roles 
                SET nombre_rol = ?, descripcion = ?
                WHERE id = ? AND estado = 1
            `, [nombre_rol, descripcion, id]);
            
            if (result.changes === 0) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            
            res.json({ 
                id: parseInt(id),
                nombre_rol,
                descripcion
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteRol: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.run(`
                UPDATE roles 
                SET estado = 0 
                WHERE id = ?
            `, [id]);
            
            if (result.changes === 0) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            
            res.json({ message: 'Rol eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = rolesController;