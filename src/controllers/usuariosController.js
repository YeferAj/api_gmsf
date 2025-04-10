const db = require('../config/db');

const usuariosController = {
    getAllUsuarios: async (req, res) => {
        try {
            const usuarios = await db.all(`
                SELECT u.*, r.nombre_rol 
                FROM usuarios u
                JOIN roles r ON u.id_rol = r.id
                WHERE u.estado = 1
            `);
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getUsuarioById: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await db.get(`
                SELECT u.*, r.nombre_rol
                FROM usuarios u
                JOIN roles r ON u.id_rol = r.id
                WHERE u.id = ? AND u.estado = 1
            `, [id]);
            
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createUsuario: async (req, res) => {
        try {
            const { 
                codigo, nombre, apellido, correo, telefono, 
                direccion, genero, tipo_documento, numero_documento, 
                fecha_nacimiento, id_rol 
            } = req.body;
            
            const result = await db.run(`
                INSERT INTO usuarios (
                    codigo, nombre, apellido, correo, telefono, 
                    direccion, genero, tipo_documento, numero_documento, 
                    fecha_nacimiento, id_rol, estado
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
            `, [codigo, nombre, apellido, correo, telefono, direccion, 
                genero, tipo_documento, numero_documento, fecha_nacimiento, id_rol]);
            
            res.status(201).json({ 
                id: result.lastID,
                ...req.body,
                estado: 1
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateUsuario: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, apellido, correo, telefono, direccion } = req.body;
            
            const result = await db.run(`
                UPDATE usuarios 
                SET nombre = ?, apellido = ?, correo = ?, 
                    telefono = ?, direccion = ?
                WHERE id = ? AND estado = 1
            `, [nombre, apellido, correo, telefono, direccion, id]);
            
            if (result.changes === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            
            res.json({ 
                id: parseInt(id),
                ...req.body
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteUsuario: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.run(
                'UPDATE usuarios SET estado = 0 WHERE id = ?',
                [id]
            );
            
            if (result.changes === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            
            res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getUsuarioMembresias: async (req, res) => {
        try {
            const { id } = req.params;
            const membresias = await db.all(`
                SELECT m.* 
                FROM membresias m
                JOIN personas p ON m.id = p.id_membresia
                WHERE p.id_usuario = ? AND m.estado = 'activa'
            `, [id]);
            
            res.json(membresias);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getUsuarioByDocumento: async (req, res) => {
        try {
            const { numero_documento } = req.params;
            const usuario = await db.get(`
                SELECT u.*, r.nombre_rol
                FROM usuarios u
                JOIN roles r ON u.id_rol = r.id
                WHERE u.numero_documento = ? AND u.estado = 1
            `, [numero_documento]);
            
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getUsuarioRol: async (req, res) => {
        try {
            const { id } = req.params;
            const rol = await db.get(`
                SELECT r.*
                FROM roles r
                JOIN usuarios u ON r.id = u.id_rol
                WHERE u.id = ? AND u.estado = 1
            `, [id]);
            
            if (!rol) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            
            res.json(rol);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = usuariosController;