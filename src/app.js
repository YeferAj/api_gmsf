const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuariosRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const serviciosRoutes = require('./routes/serviciosRoutes');
const membresiasRoutes = require('./routes/membresiasRoutes');
const personasRoutes = require('./routes/personasRoutes');
const entrenadoresRoutes = require('./routes/entrenadoresRoutes');


const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/membresias', membresiasRoutes);
app.use('/api/personas', personasRoutes);
app.use('/api/entrenadores', entrenadoresRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});