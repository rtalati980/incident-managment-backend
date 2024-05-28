const db = require('../config/db');

const Behaviour = {
    create: (behaviour, callback) => {
        const query = 'INSERT INTO behaviour (name) VALUES (?)';
        db.query(query, [behaviour.name], callback);
    },

    update: (id, behaviour, callback) => {
        const query = 'UPDATE behaviour SET name = ? WHERE id = ?';
        db.query(query, [behaviour.name, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM behaviour WHERE id = ?';
        db.query(query, [id], callback);
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM behaviour';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM behaviour WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Behaviour;
