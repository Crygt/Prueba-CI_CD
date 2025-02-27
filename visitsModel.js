// visitsModel.js
const pool = require('./db');

async function initializeDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS visits (
                id SERIAL PRIMARY KEY,
                count INT DEFAULT 0,
                mode VARCHAR(10) NOT NULL
            );
        `);
        
        const result = await pool.query('SELECT * FROM visits');
        if (result.rows.length === 0) {
            await pool.query("INSERT INTO visits (count, mode) VALUES (0, 'develope')");
        }
    } catch (error) {
        console.error("❌ Error en initializeDatabase:", error);
        throw error;
    }
}

async function incrementVisit() {
    try {
        const updateResult = await pool.query('UPDATE visits SET count = count + 1 RETURNING count');
        const result = await pool.query('SELECT * FROM visits');
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error en incrementVisit:", error);
        throw error;
    }
}

module.exports = { initializeDatabase, incrementVisit };