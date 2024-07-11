const db = require('../config/db');

const Wrklctn = {
  create: (name, bayType, userID, callback) => {
    const query = 'INSERT INTO wrklctn (name, bayType, UserID) VALUES (?, ?, ?)';
    db.query(query, [name, bayType, userID], callback);
  },

  update: (id, name, bayType, userID, callback) => {
    const query = 'UPDATE wrklctn SET name = ?, bayType = ?, UserID = ? WHERE id = ?';
    db.query(query, [name, bayType, userID, id], callback);
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

  getByName:(name,callback)=> {
    const query = 'SELECT * FROM wrklctn WHERE name = ?';
    db.query(query, [name], callback);
  }
};

module.exports = Wrklctn;
