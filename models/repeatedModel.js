const db = require('../config/db');

const Repeated = {
    create: (repeated, callback) => {
        const query = 'INSERT INTO repeated (name, status_id) VALUES (?, ?)';
        db.query(query, [repeated.name, repeated.status_id], callback);
    },

    update: (id, repeated, callback) => {
        const query = 'UPDATE repeated SET name = ?, status_id = ? WHERE id = ?';
        db.query(query, [repeated.name, repeated.status_id, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM repeated WHERE id = ?';
        db.query(query, [id], callback);
    },

    getAll: (callback) => {
        const query = `
            SELECT repeated.id, repeated.name, repeated.status_id, status.name as status_name 
            FROM repeated
            JOIN status ON repeated.status_id = status.id
        `;
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = `
            SELECT repeated.id, repeated.name, repeated.status_id, status.name as status_name 
            FROM repeated
            JOIN status ON repeated.status_id = status.id
            WHERE repeated.id = ?
        `;
        db.query(query, [id], callback);
    }
};

module.exports = Repeated;
