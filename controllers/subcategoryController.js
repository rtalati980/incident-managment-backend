const Subcategory = require('../models/subcategoryModel');

const subcategoryController = {
    create: (req, res) => {
        const { name, categoryId } = req.body;
        console.log(req.body);
        Subcategory.create({ name, categoryId: categoryid }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, name, categoryId });
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { name, categoryId } = req.body;
        Subcategory.update(id, { name, categoryId }, (err, results) => {
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

                return res.status(500).json({ error: err.message });
                console.log(err);
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
