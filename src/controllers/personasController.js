const db = require('../config/db');

const personasController = {
    getAllPersonas: async (req, res) => {
        try {
            const personas = await db.all(`
                SELECT p.id, p.fecha_registro, p.estado, p.relacion,
                       u.nombre, u.apellido, u.correo, u.telefono,
                       m.nombre as nombre_membresia,
                       t.nombre as nombre_titular, t.apellido as apellido_titular,
                       t.correo as correo_titular, t.telefono as telefono_titular
                FROM personas p
                JOIN usuarios u ON p.id_usuario = u.id
                LEFT JOIN membresias m ON p.id_membresia = m.id
                LEFT JOIN usuarios t ON p.id_titular = t.id
                WHERE p.estado = 1
            `);
            res.json(personas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getPersonaById: async (req, res) => {
        try {
            const { id } = req.params;
            const persona = await db.get(`
                SELECT p.id, p.fecha_registro, p.estado, p.relacion,
                       u.nombre, u.apellido, u.correo, u.telefono,
                       m.nombre as nombre_membresia,
                       t.nombre as nombre_titular, t.apellido as apellido_titular,
                       t.correo as correo_titular, t.telefono as telefono_titular
                FROM personas p
                JOIN usuarios u ON p.id_usuario = u.id
                LEFT JOIN membresias m ON p.id_membresia = m.id
                LEFT JOIN usuarios t ON p.id_titular = t.id
                WHERE p.id = ? AND p.estado = 1
            `, [id]);

            if (!persona) {
                return res.status(404).json({ message: 'Persona no encontrada' });
            }
            res.json(persona);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getBeneficiariosByTitular: async (req, res) => {
        try {
            const { id_titular } = req.params;
            const beneficiarios = await db.all(`
                SELECT p.id, p.fecha_registro, p.estado, p.relacion,
                       u.nombre, u.apellido, u.correo, u.telefono,
                       m.nombre as nombre_membresia,
                       t.nombre as nombre_titular, t.apellido as apellido_titular,
                       t.correo as correo_titular, t.telefono as telefono_titular
                FROM personas p
                JOIN usuarios u ON p.id_usuario = u.id
                LEFT JOIN membresias m ON p.id_membresia = m.id
                LEFT JOIN usuarios t ON p.id_titular = t.id
                WHERE p.id_titular = ? AND p.estado = 1
            `, [id_titular]);

            res.json(beneficiarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createPersona: async (req, res) => {
        try {
            const { id_usuario, id_membresia, id_titular, relacion } = req.body;

            // If it's a beneficiary, verify titular exists and is active
            if (id_titular) {
                const titular = await db.get(`
                    SELECT u.* FROM usuarios u
                    JOIN personas p ON u.id = p.id_usuario
                    WHERE u.id = ? AND u.estado = 1 AND p.estado = 1
                `, [id_titular]);

                if (!titular) {
                    return res.status(400).json({ message: 'Titular no encontrado o inactivo' });
                }
            }

            const result = await db.run(`
                INSERT INTO personas (id_usuario, id_membresia, id_titular, relacion, fecha_registro, estado)
                VALUES (?, ?, ?, ?, DATE('now'), 1)
            `, [id_usuario, id_membresia, id_titular, relacion]);

            // Get complete information including titular if exists
            const newPersona = await db.get(`
                SELECT p.id, p.fecha_registro, p.estado, p.relacion,
                       u.nombre, u.apellido, u.correo, u.telefono,
                       m.nombre as nombre_membresia,
                       t.nombre as nombre_titular, t.apellido as apellido_titular,
                       t.correo as correo_titular, t.telefono as telefono_titular
                FROM personas p
                JOIN usuarios u ON p.id_usuario = u.id
                LEFT JOIN membresias m ON p.id_membresia = m.id
                LEFT JOIN usuarios t ON p.id_titular = t.id
                WHERE p.id = ?
            `, [result.lastID]);

            res.status(201).json(newPersona);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updatePersona: async (req, res) => {
        try {
            const { id } = req.params;
            const { id_membresia, relacion } = req.body;

            const result = await db.run(`
                UPDATE personas 
                SET id_membresia = ?, relacion = ?
                WHERE id = ? AND estado = 1
            `, [id_membresia, relacion, id]);

            if (result.changes === 0) {
                return res.status(404).json({ message: 'Persona no encontrada' });
            }

            res.json({
                id: parseInt(id),
                id_membresia,
                relacion
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deletePersona: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await db.run(`
                UPDATE personas 
                SET estado = 0 
                WHERE id = ?
            `, [id]);

            if (result.changes === 0) {
                return res.status(404).json({ message: 'Persona no encontrada' });
            }

            res.json({ message: 'Persona eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = personasController;