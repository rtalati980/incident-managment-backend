const db = require('../config/db');

const Wrklctn = {
  create: (name, bayOwner, bayType, bayOwnerEmail, callback) => {
    const query = 'INSERT INTO wrklctn (name, bayOwner, bayType, bayOwnerEmail) VALUES (?, ?, ?, ?)';
    db.query(query, [name, bayOwner, bayType, bayOwnerEmail], callback);
  },

  update: (id, name, bayOwner, bayType, bayOwnerEmail, callback) => {
    const query = 'UPDATE wrklctn SET name = ?, bayOwner = ?, bayType = ?, bayOwnerEmail = ? WHERE id = ?';
    db.query(query, [name, bayOwner, bayType, bayOwnerEmail, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM wrklctn WHERE id = ?';
    db.query(query, [id], callback);
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM wrklctn';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM wrklctn WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = Wrklctn;
