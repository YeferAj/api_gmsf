const { all } = require('../config/db');

async function checkSchema() {
    try {
        const tables = await all("SELECT name, sql FROM sqlite_master WHERE type='table'");
        tables.forEach(table => {
            console.log(`\nTable: ${table.name}`);
            console.log(table.sql);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

checkSchema();