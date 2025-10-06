const mysql = require('mysql2');
require('dotenv').config({ path: './config/pass.env' });

const db = mysql.createConnection({
    host: 'k7yzrf.h.filess.io',
    user: 'incidentmanagement12_fightlost',
    password:  process.env.AIVEN_SERVICE_PASSWORD,
    database: 'incidentmanagement12_fightlost',
    port: '61032'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;