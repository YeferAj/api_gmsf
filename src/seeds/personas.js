const { run } = require('../config/db');

async function seedPersonas() {
    try {
        await run(`
            INSERT INTO personas (id_usuario, id_membresia, id_titular, relacion, fecha_registro, estado) VALUES 
            (1, 1, NULL, NULL, DATE('now'), 1),
            (2, 1, 1, 'Hijo', DATE('now'), 1),
            (3, 2, NULL, NULL, DATE('now'), 1)
        `);
        console.log('Personas seeded successfully');
    } catch (error) {
        console.error('Error seeding personas:', error);
    }
}

module.exports = seedPersonas;