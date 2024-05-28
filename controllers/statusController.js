const Status = require('../models/statusModel');

const statusController = {
    create: (req, res) => {
        const { name } = req.body;
        Status.create({ name }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, name });
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        Status.update(id, { name }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Status updated successfully' });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Status.delete(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Status deleted successfully' });
        });
    },

    getAll: (req, res) => {
        Status.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    },

    getById: (req, res) => {
        const { id } = req.params;
        Status.getById(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Status not found' });
            }
            res.status(200).json(results[0]);
        });
    }
};

module.exports = statusController;
