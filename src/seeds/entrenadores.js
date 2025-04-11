const { run } = require('../config/db');

async function seedEntrenadores() {
    try {
        await run(`
            INSERT INTO entrenadores (id_usuario, nombre, apellido, telefono, correo, fecha_registro, especialidad, id_rol, estado) VALUES 
            (2, 'Juan', 'Pérez', '3001234567', 'juan@gym.com', '2023-01-15', 'Musculación', 2, 1),
            (3, 'María', 'López', '3112345678', 'maria@gym.com', '2023-02-20', 'Cardio y Fitness', 2, 1)
        `);
        console.log('Entrenadores seeded successfully');
    } catch (error) {
        console.error('Error seeding entrenadores:', error);
    }
}

module.exports = seedEntrenadores;