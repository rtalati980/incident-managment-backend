const Type = require('../models/typeModel');

const typeController = {
    create: (req, res) => {
        const { name } = req.body;
        Type.create({ name }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, name });
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        Type.update(id, { name }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Type updated successfully' });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Type.delete(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Type deleted successfully' });
        });
    },

    getAll: (req, res) => {
        Type.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    },

    getById: (req, res) => {
        const { id } = req.params;
        Type.getById(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Type not found' });
            }
            res.status(200).json(results[0]);
        });
    }
};

module.exports = typeController;
