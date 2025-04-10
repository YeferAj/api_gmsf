const { run } = require('../config/db');

async function seedEntrenadores() {
    try {
        // First, drop the table if it exists
        await run('DROP TABLE IF EXISTS entrenadores');

        // Create the table with all columns explicitly defined
        await run(`
            CREATE TABLE entrenadores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                apellido TEXT NOT NULL,
                telefono TEXT,
                correo TEXT UNIQUE,
                id_rol INTEGER,
                estado INTEGER NOT NULL DEFAULT 1,
                FOREIGN KEY (id_rol) REFERENCES roles (id)
            )
        `);

        // Verify table structure
        await run('PRAGMA table_info(entrenadores)');

        // Insert sample data
        await run(`
            INSERT INTO entrenadores (nombre, apellido, telefono, correo, id_rol, estado) VALUES 
            ('Juan', 'Pérez', '3001234567', 'juan.entrenador@gym.com', 2, 1),
            ('María', 'González', '3112345678', 'maria.entrenador@gym.com', 2, 1),
            ('Carlos', 'Rodríguez', '3223456789', 'carlos.entrenador@gym.com', 2, 1)
        `);

        console.log('Entrenadores seeded successfully');
    } catch (error) {
        console.error('Error seeding entrenadores:', error);
        throw error; // Re-throw to see the full error in the console
    }
}

module.exports = seedEntrenadores;