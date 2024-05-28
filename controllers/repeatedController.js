const Repeated = require('../models/repeatedModel');

const repeatedController = {
    create: (req, res) => {
        const { name, status_id } = req.body;
        Repeated.create({ name, status_id }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, name, status_id });
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { name, status_id } = req.body;
        Repeated.update(id, { name, status_id }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Repeated updated successfully' });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Repeated.delete(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Repeated deleted successfully' });
        });
    },

    getAll: (req, res) => {
        Repeated.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    },

    getById: (req, res) => {
        const { id } = req.params;
        Repeated.getById(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Repeated not found' });
            }
            res.status(200).json(results[0]);
        });
    }
};

module.exports = repeatedController;
