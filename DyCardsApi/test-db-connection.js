require('dotenv').config();
const { Sequelize } = require('sequelize');

// Mostrar variables cargadas (debug)
console.log('🔍 Verificando conexión con:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);

// Crear instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // puedes poner true si quieres ver las queries
  }
);

// Probar conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa a MySQL con Sequelize.');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:');
    console.error(error.message);
  } finally {
    await sequelize.close();
  }
})();
