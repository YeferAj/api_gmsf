const { all } = require('../config/db');

async function verifySchema() {
    try {
        const tableInfo = await all('PRAGMA table_info(entrenadores)');
        console.log('Entrenadores table structure:', tableInfo);
    } catch (error) {
        console.error('Error verifying schema:', error);
    }
}

verifySchema();