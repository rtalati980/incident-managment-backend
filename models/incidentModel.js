const db = require('../config/db');
const { promisify } = require('util');

const Incident = {
    create: (incident, callback) => {
        const query = 'INSERT INTO incidents SET ?';
        db.query(query, incident, (err, result) => {
            if (err) return callback(err);
            callback(null, result.insertId);
        });
    },
    findAll: (callback) => {
        const query = 'SELECT * FROM incidents';
        db.query(query, callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM incidents WHERE id = ?';
        db.query(query, [id], callback);
    },
    update: (id, incident, callback) => {
        const query = 'UPDATE incidents SET ? WHERE id = ?';
        db.query(query, [incident, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM incidents WHERE id = ?';
        db.query(query, [id], callback);
    },
    findByUser: (userId, callback) => {
        const query = 'SELECT * FROM incidents WHERE userId = ?';
        db.query(query, [userId], callback);
    },
    findByNo: (No, callback) => {
        const query = 'SELECT * FROM incidents WHERE No = ?';
        db.query(query, [No], callback);
    },
    findByUserId: (userId, callback) => {
        const query = 'SELECT * FROM incidents WHERE assignedUsers LIKE ?';
        const searchPattern = `%"${userId}"%`; // Assume userId is surrounded by quotes in JSON
        db.query(query, [searchPattern], callback);
    },    
};

module.exports = {
    create: promisify(Incident.create),
    findAll: promisify(Incident.findAll),
    findById: promisify(Incident.findById),
    update: promisify(Incident.update),
    delete: promisify(Incident.delete),
    findByUser: promisify(Incident.findByUser),
    findByNo: promisify(Incident.findByNo),
    findByUserId: promisify(Incident.findByUserId),
};
