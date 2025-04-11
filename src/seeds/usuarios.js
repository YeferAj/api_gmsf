const { run } = require('../config/db');

async function seedUsuarios() {
    try {
        await run(`
            INSERT INTO usuarios (codigo, nombre, apellido, correo, contrasena, telefono, direccion, genero, tipo_documento, numero_documento, fecha_nacimiento, id_rol, estado) VALUES 
            ('ADM001', 'Admin', 'Sistema', 'admin@gym.com', '123456', '3001234567', 'Calle Principal #123', 'M', 'CC', '1234567890', '1990-01-01', 1, 1),
            ('ENT001', 'Juan', 'Pérez', 'juan@gym.com', '123456', '3011234567', 'Av Central #456', 'M', 'CC', '2345678901', '1992-03-15', 2, 1),
            ('ENT002', 'María', 'López', 'maria@gym.com', '123456', '3021234567', 'Carrera 7 #789', 'F', 'CC', '3456789012', '1988-07-22', 2, 1),
            ('CLI001', 'Carlos', 'Rodríguez', 'carlos@email.com', '123456', '3031234567', 'Calle 10 #234', 'M', 'CC', '4567890123', '1995-11-30', 3, 1)
        `);
        console.log('Usuarios seeded successfully');
    } catch (error) {
        console.error('Error seeding usuarios:', error);
    }
}

module.exports = seedUsuarios;