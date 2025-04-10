const seedRoles = require('./roles');
const seedUsuarios = require('./usuarios');
const seedPersonas = require('./personas');
const seedServicios = require('./servicios');
const seedMembresias = require('./membresias');
const dbPath = process.env.DB_PATH || './database.db'; // Acepta ruta desde variable de entorno
const db = new Database(dbPath);

async function seedAll() {
    try {
        await seedRoles();
        await seedUsuarios();
        await seedPersonas();
        await seedServicios();
        await seedMembresias();
        
        console.log('All seeds completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error running seeds:', error);
        process.exit(1);
    }
}

seedAll();