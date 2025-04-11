const { run } = require('../config/db');

async function seedEntrenadores() {
    try {
        await run(`
            INSERT INTO entrenadores (id_usuario, especialidad, fecha_registro, estado) VALUES 
            (4, 'Musculación', DATE('now'), 1),
            (5, 'Cardio', DATE('now'), 1),
            (6, 'Yoga', DATE('now'), 1)
        `);
        console.log('Entrenadores seeded successfully');
    } catch (error) {
        console.error('Error seeding entrenadores:', error);
    }
}

module.exports = seedEntrenadores;