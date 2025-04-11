-- Roles table
CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_rol TEXT NOT NULL,
    descripcion TEXT,
    estado INTEGER DEFAULT 1
);

-- Usuarios table
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo TEXT NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    contrasena TEXT NOT NULL,
    telefono TEXT,
    direccion TEXT,
    genero TEXT,
    tipo_documento TEXT,
    numero_documento TEXT UNIQUE,
    fecha_nacimiento DATE,
    id_rol INTEGER,
    estado INTEGER DEFAULT 1,
    FOREIGN KEY (id_rol) REFERENCES roles(id)
);

-- Membresias table
CREATE TABLE IF NOT EXISTS membresias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    duracion INTEGER NOT NULL,
    precio REAL NOT NULL,
    estado INTEGER DEFAULT 1
);

-- Personas table
CREATE TABLE IF NOT EXISTS personas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_membresia INTEGER,
    id_titular INTEGER,
    relacion TEXT,
    fecha_registro DATE DEFAULT CURRENT_DATE,
    estado INTEGER DEFAULT 1,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_membresia) REFERENCES membresias(id),
    FOREIGN KEY (id_titular) REFERENCES usuarios(id)
);

-- Entrenadores table
CREATE TABLE IF NOT EXISTS entrenadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    especialidad TEXT,
    fecha_registro DATE DEFAULT CURRENT_DATE,
    estado INTEGER DEFAULT 1,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Servicios table
CREATE TABLE IF NOT EXISTS servicios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    duracion INTEGER,
    precio REAL NOT NULL,
    capacidad_maxima INTEGER,
    estado INTEGER DEFAULT 1
);