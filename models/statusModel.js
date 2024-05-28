const db = require('../config/db');

const Status = {
    create: (status, callback) => {
        const query = 'INSERT INTO status (name) VALUES (?)';
        db.query(query, [status.name], callback);
    },

    update: (id, status, callback) => {
        const query = 'UPDATE status SET name = ? WHERE id = ?';
        db.query(query, [status.name, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM status WHERE id = ?';
        db.query(query, [id], callback);
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM status';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM status WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Status;
