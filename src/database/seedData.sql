-- Roles
INSERT INTO roles (nombre, descripcion, estado) VALUES
('Administrador', 'Control total del sistema', true),
('Entrenador', 'Gestión de clases y servicios', true),
('Cliente', 'Usuario regular del gimnasio', true),
('Recepcionista', 'Gestión de membresías y clientes', true);

-- Permisos
INSERT INTO permisos (nombre, estado) VALUES
('usuarios', true),
('roles', true),
('servicios', true),
('membresias', true),
('programaciones', true),
('reportes', true);

-- Privilegios
INSERT INTO privilegios (nombre, id_permiso) VALUES
('crear', 1), ('leer', 1), ('actualizar', 1), ('eliminar', 1),
('crear', 2), ('leer', 2), ('actualizar', 2), ('eliminar', 2),
('crear', 3), ('leer', 3), ('actualizar', 3), ('eliminar', 3),
('crear', 4), ('leer', 4), ('actualizar', 4), ('eliminar', 4),
('crear', 5), ('leer', 5), ('actualizar', 5), ('eliminar', 5),
('crear', 6), ('leer', 6), ('actualizar', 6), ('eliminar', 6);

-- Rol_privilegio
INSERT INTO rol_privilegio (id_rol, id_permiso, id_privilegio) VALUES
(1, 1, 1), (1, 1, 2), (1, 1, 3), (1, 1, 4),
(2, 3, 9), (2, 3, 10), (2, 3, 11),
(3, 3, 10),
(4, 4, 13), (4, 4, 14), (4, 4, 15);

-- Usuarios
INSERT INTO usuarios (codigo, nombre, apellido, correo, contrasena, telefono, direccion, genero, tipo_documento, numero_documento, fecha_nacimiento, id_rol) VALUES
('U001', 'Admin', 'Sistema', 'admin@gmsf.com', 'admin123', '3001234567', 'Calle 1 #1-1', 'M', 'CC', '1000000001', '1990-01-01', 1),
('U002', 'Juan', 'Entrenador', 'juan@gmsf.com', 'juan123', '3001234568', 'Calle 2 #2-2', 'M', 'CC', '1000000002', '1992-02-02', 2),
('U003', 'Maria', 'Cliente', 'maria@gmail.com', 'maria123', '3001234569', 'Calle 3 #3-3', 'F', 'CC', '1000000003', '1995-03-03', 3),
('U004', 'Ana', 'Recepcion', 'ana@gmsf.com', 'ana123', '3001234570', 'Calle 4 #4-4', 'F', 'CC', '1000000004', '1993-04-04', 4);

-- Usuario_rol
INSERT INTO usuario_rol (id_usuario, id_rol, fecha_inicio) VALUES
(1, 1, '2023-01-01'),
(2, 2, '2023-01-01'),
(3, 3, '2023-01-01'),
(4, 4, '2023-01-01');

-- Personas
INSERT INTO personas (id_usuario, codigo, fecha_registro, estado) VALUES
(1, 'P001', '2023-01-01', true),
(2, 'P002', '2023-01-01', true),
(3, 'P003', '2023-01-01', true),
(4, 'P004', '2023-01-01', true);

-- Servicios (ya existentes, añadiendo más datos)
INSERT INTO servicios (nombre, descripcion, precio, estado, duracion_clase) VALUES
('Yoga', 'Clases de yoga para todos los niveles', 50000, true, '1:00'),
('Pilates', 'Ejercicios de pilates', 60000, true, '1:00'),
('Spinning', 'Ciclismo indoor', 45000, true, '0:45'),
('Crossfit', 'Entrenamiento funcional', 70000, true, '1:00');

-- Uso_servicios
INSERT INTO uso_servicios (id_cliente, fecha, hora_inicio, hora_fin, id_servicio) VALUES
(3, '2024-01-15', '08:00', '09:00', 1),
(3, '2024-01-16', '10:00', '11:00', 2),
(3, '2024-01-17', '15:00', '16:00', 3);

-- Membresias
INSERT INTO membresias (nombre, descripcion, dias_acceso, vigencia_dias, precio, fecha_creacion, estado) VALUES
('Básica', 'Acceso a gimnasio', 30, 30, 80000, '2023-01-01', true),
('Premium', 'Acceso a gimnasio y clases', 30, 30, 120000, '2023-01-01', true),
('Gold', 'Acceso total', 30, 30, 150000, '2023-01-01', true);

-- Membresia_servicio
INSERT INTO membresia_servicio (id_membresia, id_servicio, fecha_creacion, estado) VALUES
(2, 1, '2023-01-01', true),
(2, 2, '2023-01-01', true),
(3, 1, '2023-01-01', true),
(3, 2, '2023-01-01', true),
(3, 3, '2023-01-01', true),
(3, 4, '2023-01-01', true);

-- Contratos (necesario para uso_membresia)
INSERT INTO contratos (codigo, id_persona, id_membresia, fecha_inicio, fecha_fin, membresia_precio, estado, usuario_registro) VALUES
('C0001', 3, 2, '2024-01-01', '2024-01-31', 120000, 'Activo', 1);

-- Uso_membresia
INSERT INTO uso_membresia (id_contrato, fecha_uso) VALUES
(1, '2024-01-15'),
(1, '2024-01-16'),
(1, '2024-01-17');