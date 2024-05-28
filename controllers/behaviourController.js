const Behaviour = require('../models/behaviourModel');

const behaviourController = {
    create: (req, res) => {
        const { name } = req.body;
        Behaviour.create({ name }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, name });
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        Behaviour.update(id, { name }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Behaviour updated successfully' });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        Behaviour.delete(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Behaviour deleted successfully' });
        });
    },

    getAll: (req, res) => {
        Behaviour.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    },

    getById: (req, res) => {
        const { id } = req.params;
        Behaviour.getById(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Behaviour not found' });
            }
            res.status(200).json(results[0]);
        });
    }
};

module.exports = behaviourController;
