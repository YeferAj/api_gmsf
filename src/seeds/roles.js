const { run } = require('../config/db');

async function seedRoles() {
    try {
        await run(`
            CREATE TABLE IF NOT EXISTS roles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre_rol TEXT NOT NULL,
                descripcion TEXT
            )
        `);

        await run(`
            INSERT INTO roles (nombre_rol, descripcion) VALUES 
            ('admin', 'Administrador del sistema'),
            ('titular', 'Usuario titular'),
            ('beneficiario', 'Usuario beneficiario'),
            ('entrenador', 'Entrenador deportivo')
        `);
        console.log('Roles seeded successfully');
    } catch (error) {
        console.error('Error seeding roles:', error);
    }
}

module.exports = seedRoles;