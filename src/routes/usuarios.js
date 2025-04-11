const express = require('express');
const router = express.Router();
const { all } = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const usuarios = await all(`
            SELECT 
                u.*,
                r.nombre as nombre_rol
            FROM usuarios u
            LEFT JOIN roles r ON u.id_rol = r.id
            WHERE u.estado = 1
        `);
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;