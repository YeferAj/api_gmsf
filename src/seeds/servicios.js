const { run } = require('../config/db');

async function seedServicios() {
    try {
        // Drop and recreate servicios table
        await run('DROP TABLE IF EXISTS servicios');
        await run(`
            CREATE TABLE servicios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre_servicio TEXT NOT NULL,
                descripcion TEXT,
                estado INTEGER DEFAULT 1
            )
        `);

        // Insert sample data
        await run(`
            INSERT INTO servicios (nombre_servicio, descripcion, estado) VALUES 
            ('Entrenamiento Personal', 'Sesiones personalizadas uno a uno', 1),
            ('Yoga', 'Clases grupales de yoga', 1),
            ('Zumba', 'Clases de baile y ejercicio', 1),
            ('Crossfit', 'Entrenamiento funcional de alta intensidad', 1),
            ('Spinning', 'Ciclismo bajo techo', 1)
        `);
        
        console.log('Servicios seeded successfully');
    } catch (error) {
        console.error('Error seeding servicios:', error);
    }
}

module.exports = seedServicios;