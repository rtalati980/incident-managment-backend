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
   findAll: (limit, offset, callback) => {
        const query = `SELECT * FROM incidents ORDER BY repoDate DESC LIMIT ? OFFSET ?`;
        db.query(query, [limit, offset], callback);
    },

    // Get total count of incidents
    findById: (id, limit, offset, callback) => {
        const query = `SELECT * FROM incidents WHERE id = ? ORDER BY repoDate DESC LIMIT ? OFFSET ?`;
        db.query(query, [id, limit, offset], callback);
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
        const query = 'SELECT * FROM incidents WHERE assignedUsers = ?';
       // Assume userId is surrounded by quotes in JSON
        db.query(query, [userId], callback);
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
