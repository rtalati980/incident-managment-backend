const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12751651',
    password: 'RENS9LvXaF',
    database: 'sql12751651'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;
