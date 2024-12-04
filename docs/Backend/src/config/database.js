const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost', // or your MySQL server hostname
  user: 'root',
  password: 'Dsv@7612',
  database: 'products',
  waitForConnections: true,
  connectionLimit: 20, // You can adjust this value as per your requirements
  queueLimit: 0
});

module.exports = pool;