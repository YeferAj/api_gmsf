const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(dbPath);

// Fix roles table
db.serialize(() => {
    db.run('DROP TABLE IF EXISTS roles');
    db.run(`
        CREATE TABLE roles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre_rol TEXT UNIQUE NOT NULL,
            descripcion TEXT,
            estado INTEGER DEFAULT 1
        )
    `);

    // Fix membresias table
    db.run('DROP TABLE IF EXISTS membresias');
    db.run(`
        CREATE TABLE membresias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            descripcion TEXT,
            duracion INTEGER NOT NULL,
            precio REAL NOT NULL,
            estado INTEGER DEFAULT 1
        )
    `);

    // Fix usuarios table
    db.run('DROP TABLE IF EXISTS usuarios');
    db.run(`
        CREATE TABLE usuarios (
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
            fecha_nacimiento DATE NOT NULL,
            estado INTEGER DEFAULT 1,
            id_rol INTEGER,
            FOREIGN KEY (id_rol) REFERENCES roles(id)
        )
    `);

    // Fix entrenadores table
    db.run('DROP TABLE IF EXISTS entrenadores');
    db.run(`
        CREATE TABLE entrenadores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER NOT NULL,
            especialidad TEXT NOT NULL,
            fecha_registro DATE NOT NULL,
            estado INTEGER DEFAULT 1,
            FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
        )
    `);
    db.run('DROP TABLE IF EXISTS entrenadores');
    db.run(`
        CREATE TABLE entrenadores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER,
            nombre TEXT NOT NULL,
            apellido TEXT NOT NULL,
            telefono TEXT,
            correo TEXT UNIQUE NOT NULL,
            fecha_registro DATE NOT NULL,
            especialidad TEXT NOT NULL,
            id_rol INTEGER,
            estado INTEGER DEFAULT 1,
            FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
            FOREIGN KEY (id_rol) REFERENCES roles(id)
        )
    `);

    // Fix personas table
    db.run('DROP TABLE IF EXISTS personas');
    db.run(`
        CREATE TABLE personas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER NOT NULL,
            id_membresia INTEGER,
            id_titular INTEGER,
            relacion TEXT,
            fecha_registro DATE NOT NULL,
            estado INTEGER DEFAULT 1,
            FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
            FOREIGN KEY (id_membresia) REFERENCES membresias(id),
            FOREIGN KEY (id_titular) REFERENCES usuarios(id)
        )
    `);

    console.log('Database structure fixed');
});

db.close();