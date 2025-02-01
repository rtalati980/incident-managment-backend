const db = require('../config/db');

const Wrklctn = {
  create: (name, bayTypeId, userID, callback) => {
    const query = 'INSERT INTO wrklctn (name, bayTypeId, UserID) VALUES (?, ?, ?)';
    db.query(query, [name, bayTypeId, userID], callback);
  },

  update: (id, name, bayTypeId, userID, callback) => {
    const query = 'UPDATE wrklctn SET name = ?, bayTypeId = ?, UserID = ? WHERE id = ?';
    db.query(query, [name, bayTypeId, userID, id], callback);
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
  },

  getByName: (name, callback) => {
    const query = 'SELECT * FROM wrklctn WHERE name = ?';
    db.query(query, [name], callback);
  },

  getByBayType: (bayTypeId, callback) => {
    const query = 'SELECT * FROM wrklctn WHERE bayTypeId = ?';
    db.query(query, [bayTypeId], callback);
  }
};

module.exports = Wrklctn;
