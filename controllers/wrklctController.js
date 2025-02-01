const Wrklctn = require('../models/wrklctnModel');

const wrklctnController = {
    create: (req, res) => {
        const { name, bayType, UserID } = req.body;
        console.log(req.body);
        Wrklctn.create(name, bayType, UserID, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId, name, bayType, UserID });
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { name, bayType, UserID } = req.body;
        
        Wrklctn.update(id, name, bayType, UserID, (err, results) => {
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
    },

    getByName:(req,res)=> {
        const { name} = req.params;
        
        Wrklctn.getByName(name, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Work location not found' });
            }
            res.status(200).json(results[0]);
        });
    },

    getByBayType: (req, res) => {
        const { bayTypeId } = req.params;
        Wrklctn.getByBayType(bayTypeId, (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          return res.status(200).json(result);
        });
      }
    
};


module.exports = wrklctnController;
