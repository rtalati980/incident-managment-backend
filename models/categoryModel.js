const db = require('../config/db');

const Category = {
    create: (category, callback) => {
        const query = 'INSERT INTO category (name) VALUES (?)';
        db.query(query, [category.name], callback);
    },

    update: (id, category, callback) => {
        const query = 'UPDATE category SET name = ? WHERE id = ?';
        db.query(query, [category.name, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM category WHERE id = ?';
        db.query(query, [id], callback);
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM category';
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM category WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Category;
