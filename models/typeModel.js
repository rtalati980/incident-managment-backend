const db = require('../config/db');

const Type = {
    create: (type, callback) => {
        const query = 'INSERT INTO type (name) VALUES (?)';
        db.query(query, [type.name], callback);
    },

    update: (id, type, callback) => {
        const query = 'UPDATE type SET name = ? WHERE id = ?';
        db.query(query, [type.name, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM type WHERE id = ?';
        db.query(query, [id], callback);
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM type';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM type WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Type;
