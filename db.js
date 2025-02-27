// db.js
const { Pool } = require('pg');  
require('dotenv').config();  

const pool = new Pool({
    user: process.env.DB_USER,         
    host: process.env.DB_HOST,         
    database: process.env.DB_NAME,     
    password: process.env.DB_PASSWORD, // Aquí usa DB_PASSWORD, no DB_PASS
    port: process.env.DB_PORT || 5432, // Si falta DB_PORT, usa el valor por defecto
});

pool.connect()
    .then(() => console.log("✅ Conectado a PostgreSQL"))
    .catch(err => console.error("❌ Error de conexión:", err));

module.exports = pool;
