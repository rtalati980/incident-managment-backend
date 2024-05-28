const Category = require('../models/categoryModel');

const categoryController = {
    create: (req, res) => {
        const { name } = req.body;
        Category.create({ name }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, name });
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        Category.update(id, { name }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Category updated successfully' });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Category.delete(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Category deleted successfully' });
        });
    },

    getAll: (req, res) => {
        Category.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    },

    getById: (req, res) => {
        const { id } = req.params;
        Category.getById(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json(results[0]);
        });
    }
};

module.exports = categoryController;
