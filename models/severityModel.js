const db = require('../config/db');

const Severity = {
    create: (severity, callback) => {
        const query = 'INSERT INTO severity (name) VALUES (?)';
        db.query(query, [severity.name], callback);
    },

    update: (id, severity, callback) => {
        const query = 'UPDATE severity SET name = ? WHERE id = ?';
        db.query(query, [severity.name, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM severity WHERE id = ?';
        db.query(query, [id], callback);
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM severity';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM severity WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Severity;
