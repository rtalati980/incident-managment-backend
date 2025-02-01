const db = require('../config/db');

const BayType = {
  create: (name, callback) => {
    const query = 'INSERT INTO bayType (name) VALUES (?)';
    db.query(query, [name], callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM bayType';
    db.query(query, callback);
  }
};

module.exports = BayType;
