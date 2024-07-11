const Subcategory = require('../models/subcategoryModel');

const subcategoryController = {
    create: (req, res) => {
        const { name, category_id } = req.body;
        console.log(req.body);

        Subcategory.create({ name, category_id }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, name, category_id });
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { name, category_id } = req.body;

        Subcategory.update(id, { name, category_id }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Subcategory updated successfully' });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;

        Subcategory.delete(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Subcategory deleted successfully' });
        });
    },

    getAll: (req, res) => {
        Subcategory.getAll((err, results) => {
            if (err) {
                console.log(err);  // Log the error for debugging purposes
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    },

    getById: (req, res) => {
        const { id } = req.params;

        Subcategory.getById(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Subcategory not found' });
            }
            res.status(200).json(results[0]);
        });
    }
};

module.exports = subcategoryController;
