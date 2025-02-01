const BayType = require('../models/bayTypeModel');

const BayTypeController = {
  create: (req, res) => {
    const { name } = req.body;
    BayType.create(name, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(201).json({ message: 'BayType created successfully', result });
    });
  },

  getAll: (req, res) => {
    BayType.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json(results);
    });
  }
};

module.exports = BayTypeController;
