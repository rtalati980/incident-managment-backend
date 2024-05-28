const db = require('../config/db');

const Subcategory = {
    create: (subcategory, callback) => {
        const query = 'INSERT INTO subcategory (name, categoryId) VALUES (?, ?)';
        db.query(query, [subcategory.name, subcategory.categoryId], callback);
    },

    update: (id, subcategory, callback) => {
        const query = 'UPDATE subcategory SET name = ?, categoryId = ? WHERE id = ?';
        db.query(query, [subcategory.name, subcategory.categoryId, id], callback);
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM subcategory WHERE id = ?';
        db.query(query, [id], callback);
    },

    getAll: (callback) => {
        const query = `
            SELECT subcategory.id, subcategory.name, subcategory.categoryId, category.name as category_name 
            FROM subcategory
            JOIN category ON subcategory.categoryId = category.id
        `;
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = `
            SELECT subcategory.id, subcategory.name, subcategory.categoryId, category.name as category_name 
            FROM subcategory
            JOIN category ON subcategory.categoryIid = category.id
            WHERE subcategory.id = ?
        `;
        db.query(query, [id], callback);
    }
};

module.exports = Subcategory;
