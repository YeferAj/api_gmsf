const { run } = require('../config/db');

async function seedMembresias() {
    try {
        await run(`
            CREATE TABLE IF NOT EXISTS membresias (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                id_usuario INTEGER,
                fecha_inicio TEXT NOT NULL,
                fecha_fin TEXT NOT NULL,
                tipo_membresia TEXT NOT NULL,
                estado TEXT DEFAULT 'activa',
                precio REAL,
                FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
            )
        `);

        await run(`
            INSERT INTO membresias (id_usuario, fecha_inicio, fecha_fin, tipo_membresia, estado, precio) VALUES 
            (1, '2024-01-01', '2024-12-31', 'Premium', 'activa', 500000),
            (2, '2024-02-01', '2024-08-01', 'Básica', 'activa', 300000),
            (3, '2024-01-15', '2024-07-15', 'Estándar', 'activa', 400000),
            (4, '2024-03-01', '2024-09-01', 'Premium', 'activa', 500000),
            (5, '2024-02-15', '2024-08-15', 'Básica', 'activa', 300000),
            (6, '2024-01-01', '2024-12-31', 'Premium', 'activa', 500000),
            (7, '2024-03-15', '2024-09-15', 'Estándar', 'activa', 400000),
            (8, '2024-02-01', '2024-08-01', 'Básica', 'activa', 300000),
            (9, '2024-01-15', '2024-07-15', 'Premium', 'activa', 500000),
            (10, '2024-03-01', '2024-09-01', 'Estándar', 'activa', 400000)
        `);
        console.log('Membresias seeded successfully');
    } catch (error) {
        console.error('Error seeding membresias:', error);
    }
}

module.exports = seedMembresias;