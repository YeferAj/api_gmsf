const db = require('../config/db');

const personasController = {
    getAllPersonas: async (req, res) => {
        try {
            const personas = await db.all(`
                SELECT p.*, u.nombre, u.apellido, u.correo
                FROM personas p
                JOIN usuarios u ON p.id_usuario = u.id
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
            const persona = await db.all(`
                SELECT p.*, u.nombre, u.apellido, u.correo
                FROM personas p
                JOIN usuarios u ON p.id_usuario = u.id
                WHERE p.id_persona = ? AND p.estado = 1
            `, [id]);
            
            if (!persona) {
                return res.status(404).json({ message: 'Persona no encontrada' });
            }
            res.json(persona);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createPersona: async (req, res) => {
        try {
            const { id_usuario, codigo, id_titular, relacion, fecha_registro } = req.body;
            
            const result = await db.run(`
                INSERT INTO personas (
                    id_usuario, codigo, id_titular, 
                    relacion, fecha_registro, estado
                ) VALUES (?, ?, ?, ?, ?, 1)
            `, [id_usuario, codigo, id_titular, relacion, fecha_registro]);
            
            res.status(201).json({ 
                id: result.lastID,
                ...req.body,
                estado: 1
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updatePersona: async (req, res) => {
        try {
            const { id } = req.params;
            const { relacion } = req.body;
            
            const result = await db.run(`
                UPDATE personas 
                SET relacion = ?
                WHERE id_persona = ? AND estado = 1
            `, [relacion, id]);
            
            if (result.changes === 0) {
                return res.status(404).json({ message: 'Persona no encontrada' });
            }
            
            res.json({ 
                id: parseInt(id),
                ...req.body
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
                WHERE id_persona = ?
            `, [id]);
            
            if (result.changes === 0) {
                return res.status(404).json({ message: 'Persona no encontrada' });
            }
            
            res.json({ message: 'Persona eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getBeneficiariosByTitular: async (req, res) => {
        try {
            const { id } = req.params;
            const beneficiarios = await db.all(`
                SELECT p.*, u.nombre, u.apellido, u.correo
                FROM personas p
                JOIN usuarios u ON p.id_usuario = u.id
                WHERE p.id_titular = ? AND p.estado = 1
            `, [id]);
            
            res.json(beneficiarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    assignMembresia: async (req, res) => {
        try {
            const { id } = req.params;
            const { id_membresia } = req.body;
            
            // Verify if persona exists
            const persona = await db.get('SELECT * FROM personas WHERE id_persona = ? AND estado = 1', [id]);
            if (!persona) {
                return res.status(404).json({ message: 'Persona no encontrada' });
            }

            // Verify if membresia exists
            const membresia = await db.get('SELECT * FROM membresias WHERE id = ? AND estado = "activa"', [id_membresia]);
            if (!membresia) {
                return res.status(404).json({ message: 'Membresía no encontrada o inactiva' });
            }

            // Assign membresia to persona
            const result = await db.run(
                'UPDATE personas SET id_membresia = ? WHERE id_persona = ?',
                [id_membresia, id]
            );
            
            res.json({ message: 'Membresía asignada correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getPersonaMembresia: async (req, res) => {
        try {
            const { id } = req.params;
            const membresia = await db.get(`
                SELECT m.*, p.id_persona, u.nombre, u.apellido
                FROM personas p
                JOIN membresias m ON p.id_membresia = m.id
                JOIN usuarios u ON p.id_usuario = u.id
                WHERE p.id_persona = ? AND p.estado = 1
            `, [id]);
            
            if (!membresia) {
                return res.status(404).json({ message: 'No se encontró membresía para esta persona' });
            }
            
            res.json(membresia);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = personasController;