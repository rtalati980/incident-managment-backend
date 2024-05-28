const Severity = require('../models/severityModel');

const severityController = {
    create: (req, res) => {
        const { name } = req.body;
        Severity.create({ name }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, name });
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        Severity.update(id, { name }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Severity updated successfully' });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Severity.delete(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Severity deleted successfully' });
        });
    },

    getAll: (req, res) => {
        Severity.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    },

    getById: (req, res) => {
        const { id } = req.params;
        Severity.getById(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Severity not found' });
            }
            res.status(200).json(results[0]);
        });
    }
};

module.exports = severityController;
