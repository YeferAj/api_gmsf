const express = require('express');
const cors = require('cors');
const app = express();

// Import routes
const rolesRoutes = require('./routes/roles');
// Update the import path
const personasRoutes = require('./routes/personasRoutes');  // Make sure this matches the file name
const entrenadoresRoutes = require('./routes/entrenadoresRoutes');
const personasRoutes = require('./routes/personas');
const membresiasRoutes = require('./routes/membresias');
const serviciosRoutes = require('./routes/servicios');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/roles', rolesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/entrenadores', entrenadoresRoutes);
app.use('/api/personas', personasRoutes);
app.use('/api/membresias', membresiasRoutes);
app.use('/api/servicios', serviciosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;