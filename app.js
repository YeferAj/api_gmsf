const express = require('express');
const cors = require('cors');
const entrenadoresRoutes = require('./src/routes/entrenadoresRoutes');
const membresiasRoutes = require('./src/routes/membresiasRoutes');
const serviciosRoutes = require('./src/routes/serviciosRoutes');
const usuariosRoutes = require('./src/routes/usuariosRoutes');
const personasRoutes = require('./src/routes/personasRoutes');
const rolesRoutes = require('./src/routes/rolesRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/entrenadores', entrenadoresRoutes);
app.use('/api/membresias', membresiasRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/personas', personasRoutes);
app.use('/api/roles', rolesRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to GSMF API' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;