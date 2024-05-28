const Wrklctn = require('../models/wrklctnModel');

const wrklctnController = {
    create: (req, res) => {
        const { name, bayOwner, bayType, bayOwnerEmail } = req.body;
        
        Wrklctn.create(name, bayOwner, bayType, bayOwnerEmail, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, name });
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { name, bayOwner, bayType, bayOwnerEmail } = req.body;
        
        Wrklctn.update(id, name, bayOwner, bayType, bayOwnerEmail, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Work location updated successfully' });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        
        Wrklctn.delete(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Work location deleted successfully' });
        });
    },

    getAll: (req, res) => {
        Wrklctn.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json(results);
        });
    },

    getById: (req, res) => {
        const { id } = req.params;
        
        Wrklctn.getById(id, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Work location not found' });
            }
            res.status(200).json(results[0]);
        });
    }
};

module.exports = wrklctnController;
