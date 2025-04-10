const { run } = require('../config/db');

async function seedPersonas() {
    try {
        await run(`
            CREATE TABLE IF NOT EXISTS personas (
                id_persona INTEGER PRIMARY KEY AUTOINCREMENT,
                id_usuario INTEGER,
                codigo TEXT UNIQUE,
                id_titular INTEGER NULL,
                id_membresia INTEGER NULL,
                relacion TEXT NULL,
                fecha_registro TEXT NOT NULL,
                estado INTEGER DEFAULT 1,
                FOREIGN KEY (id_usuario) REFERENCES usuarios (id),
                FOREIGN KEY (id_titular) REFERENCES personas (id_persona),
                FOREIGN KEY (id_membresia) REFERENCES membresias (id)
            )
        `);

        // Create titulares with membresias
        await run(`
            INSERT INTO personas (id_usuario, codigo, fecha_registro, id_membresia) VALUES 
            (1, 'PER001', '2024-03-15', 1),
            (2, 'PER002', '2024-03-15', 2),
            (3, 'PER003', '2024-03-15', 3)
        `);

        // Create beneficiarios with membresias
        await run(`
            INSERT INTO personas (id_usuario, codigo, id_titular, relacion, fecha_registro, id_membresia) VALUES 
            (4, 'PER004', 1, 'Hijo', '2024-03-15', 4),
            (5, 'PER005', 2, 'Cónyuge', '2024-03-15', 5)
        `);
        console.log('Personas seeded successfully');
    } catch (error) {
        console.error('Error seeding personas:', error);
    }
}

module.exports = seedPersonas;