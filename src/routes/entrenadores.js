const express = require('express');
const router = express.Router();
const { all } = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const entrenadores = await all(`
            SELECT 
                e.id,
                e.id_usuario,
                e.nombre,
                e.fecha_registro,
                e.especialidad,
                e.estado
            FROM entrenadores e
            WHERE e.estado = 1
        `);
        res.json(entrenadores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;