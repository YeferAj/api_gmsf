const { run } = require('../config/db');

async function seedRoles() {
    try {
        await run(`
            INSERT INTO roles (nombre_rol, descripcion, estado) VALUES 
            ('Administrador', 'Control total del sistema', 1),
            ('Entrenador', 'Gestión de rutinas y clientes', 1),
            ('Cliente', 'Usuario regular del gimnasio', 1)
        `);
        console.log('Roles seeded successfully');
    } catch (error) {
        console.error('Error seeding roles:', error);
    }
}

module.exports = seedRoles;