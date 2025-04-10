const { run } = require('../config/db');

async function seedUsuarios() {
    try {
        await run(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                codigo TEXT UNIQUE,
                nombre TEXT NOT NULL,
                apellido TEXT NOT NULL,
                correo TEXT UNIQUE,
                telefono TEXT,
                direccion TEXT,
                genero TEXT,
                tipo_documento TEXT,
                numero_documento TEXT UNIQUE,
                fecha_nacimiento TEXT,
                id_rol INTEGER,
                estado INTEGER DEFAULT 1,
                FOREIGN KEY (id_rol) REFERENCES roles (id)
            )
        `);

        await run(`
            INSERT INTO usuarios (codigo, nombre, apellido, correo, telefono, direccion, genero, tipo_documento, numero_documento, fecha_nacimiento, id_rol, estado) VALUES 
            ('USR001', 'Juan', 'Pérez', 'juan@email.com', '3001234567', 'Calle 1 #123', 'M', 'CC', '123456789', '1990-01-01', 1, 1),
            ('USR002', 'María', 'López', 'maria@email.com', '3112345678', 'Calle 2 #456', 'F', 'CC', '987654321', '1992-02-02', 2, 1),
            ('USR003', 'Carlos', 'García', 'carlos@email.com', '3223456789', 'Calle 3 #789', 'M', 'CC', '456789123', '1988-03-03', 3, 1)
        `);
        console.log('Usuarios seeded successfully');
    } catch (error) {
        console.error('Error seeding usuarios:', error);
    }
}

module.exports = seedUsuarios;