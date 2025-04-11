const { run } = require('../config/db');

async function seedMembresias() {
    try {
        await run(`
            INSERT INTO membresias (nombre, descripcion, duracion, precio, estado) VALUES 
            ('Plan Básico', 'Acceso básico al gimnasio', 30, 50000, 1),
            ('Plan Estándar', 'Acceso a todas las áreas', 90, 120000, 1),
            ('Plan Premium', 'Acceso total más entrenador personal', 180, 200000, 1),
            ('Plan Anual', 'Acceso completo por un año', 365, 400000, 1)
        `);
        console.log('Membresias seeded successfully');
    } catch (error) {
        console.error('Error seeding membresias:', error);
    }
}

module.exports = seedMembresias;