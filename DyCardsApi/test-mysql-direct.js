const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ahinestr',
  password: 'Dynamichc123.',
  database: 'dycards',
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error de conexión directa:', err.message);
    return;
  }
  console.log('✅ Conexión directa a MySQL exitosa.');
  connection.end();
});
