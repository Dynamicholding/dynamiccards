require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const sandboxRoutes = require('./routes/sandbox');
const path = require('path');


const app = express();
app.use(cors({
   //origin: 'http://localhost:4200', // tu app Angular - Local
   origin: ['http://localhost:4200', 'https://dyncards.com', 'https://www.dyncards.com'],
  credentials: true
}));

app.use(express.json());

// Servir archivos estáticos (como avatares)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas princuipales
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/accounts', require('./routes/account'));
app.use('/api/movements', require('./routes/movement')); 
app.use('/api/sandbox', sandboxRoutes);

app.get('/api', (req, res) => {
  res.send('API de DyCards en funcionamiento');
});


// Ruta para subir imágenes
const uploadRoutes = require('./routes/upload.routes');
app.use('/api', uploadRoutes);

/* Tareas programadas */
require('./jobs/corte.job');

// Iniciar servidor
const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(port, '0.0.0.0',() => console.log(`Servidor corriendo en http://localhost:${port}/api`));
});
