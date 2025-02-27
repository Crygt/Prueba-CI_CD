// server.js
const express = require('express');
const { initializeDatabase } = require('./visitsModel'); // Importa la función
const visitsRouter = require('./routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/visits', visitsRouter);

// Inicializa la base de datos antes de arrancar el servidor
initializeDatabase()
    .then(() => console.log("✅ Base de datos inicializada"))
    .catch(err => console.error("❌ Error al inicializar la base de datos:", err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
