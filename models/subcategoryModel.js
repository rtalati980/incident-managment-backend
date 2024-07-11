const db = require('../config/db');

const Subcategory = {
    create: (subcategory, callback) => {
        const query = 'INSERT INTO subcategory (name, category_id) VALUES (?, ?)';
        db.query(query, [subcategory.name, subcategory.category_id], callback);
    },

    update: (id, subcategory, callback) => {
        const query = 'UPDATE subcategory SET name = ?, category_id = ? WHERE id = ?';
        db.query(query, [subcategory.name, subcategory.category_id, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM subcategory WHERE id = ?';
        db.query(query, [id], callback);
    },

    getAll: (callback) => {
        const query = `
            SELECT subcategory.id, subcategory.name, subcategory.category_id, category.name AS category_name
            FROM subcategory
            JOIN category ON subcategory.category_id = category.id
        `;
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = `
            SELECT subcategory.id, subcategory.name, subcategory.category_id, category.name AS category_name
            FROM subcategory
            JOIN category ON subcategory.category_id = category.id
            WHERE subcategory.id = ?
        `;
        db.query(query, [id], callback);
    },

    getByCategoryId: (categoryId, callback) => {
        const query = `
            SELECT subcategory.id, subcategory.name, subcategory.category_id, category.name AS category_name
            FROM subcategory
            JOIN category ON subcategory.category_id = category.id
            WHERE subcategory.category_id = ?
        `;
        db.query(query, [categoryId], callback);
    }
};

module.exports = Subcategory;
