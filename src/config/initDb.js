const db = require('./db');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
    try {
        // Create usuarios table
        await db.run(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                codigo TEXT UNIQUE NOT NULL,
                nombre TEXT NOT NULL,
                apellido TEXT NOT NULL,
                correo TEXT UNIQUE NOT NULL,
                contrasena TEXT NOT NULL,
                telefono TEXT,
                direccion TEXT,
                genero TEXT CHECK (genero IN ('M', 'F', 'O')),
                tipo_documento TEXT CHECK (tipo_documento IN ('CC', 'CE', 'TI', 'PP', 'DIE')),
                numero_documento TEXT UNIQUE NOT NULL,
                fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP,
                asistencias_totales INTEGER DEFAULT 0,
                fecha_nacimiento DATE NOT NULL,
                estado INTEGER DEFAULT 1,
                id_rol INTEGER
            )
        `);

        // Create roles table
        await db.run(`
            CREATE TABLE IF NOT EXISTS roles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT UNIQUE NOT NULL,
                descripcion TEXT,
                estado INTEGER DEFAULT 1
            )
        `);

        // Create servicios table
        await db.run(`
            CREATE TABLE IF NOT EXISTS servicios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT UNIQUE NOT NULL,
                descripcion TEXT,
                precio REAL NOT NULL,
                estado INTEGER DEFAULT 1,
                duracion_clase TEXT
            )
        `);

        // Create entrenadores table
        await db.run(`
            CREATE TABLE IF NOT EXISTS entrenadores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                id_usuario INTEGER,
                fecha_registro DATE NOT NULL,
                especialidad TEXT NOT NULL,
                estado INTEGER DEFAULT 1,
                FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
            )
        `);

        // After creating tables, populate the database
        await populateDatabase();
        
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

async function populateDatabase() {
    try {
        const seedSQL = fs.readFileSync(
            path.join(__dirname, '../database/seedData.sql'),
            'utf8'
        );
        
        const statements = seedSQL.split(';').filter(stmt => stmt.trim());
        
        for (let statement of statements) {
            if (statement.trim()) {
                await db.run(statement);
            }
        }
        
        console.log('Database populated successfully');
    } catch (error) {
        console.error('Error populating database:', error);
    }
}

// Remove the top-level await and call initializeDatabase properly
initializeDatabase().catch(error => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
});

module.exports = initializeDatabase;