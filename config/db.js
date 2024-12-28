const mysql = require('mysql2');
require('dotenv').config({ path: './config/pass.env' });

const db = mysql.createConnection({
    host: 'mysql-3dc19a78-ronakjain980-ca3b.l.aivencloud.com',
    user: 'avnadmin',
    password:  process.env.AIVEN_SERVICE_PASSWORD,
    database: 'defaultdb',
    port: '13407'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;