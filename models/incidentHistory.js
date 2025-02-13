const db = require('../config/db');
const { promisify } = require('util');

const IncidentHistory = {
    create: (history, callback) => {
        const query = 'INSERT INTO incidenthistory SET ?';
        db.query(query, history, (err, result) => {
            if (err) return callback(err);
            callback(null, result.insertId);
        });
    },
    findAll: (callback) => {
        const query = 'SELECT * FROM incidenthistory';
        db.query(query, callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM incidenthistory WHERE HistoryID = ?';
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    update: (id, history, callback) => {
        const query = 'UPDATE incidenthistory SET ? WHERE HistoryID = ?';
        db.query(query, [history, id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM incidenthistory WHERE HistoryID = ?';
        db.query(query, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },
    findByIncidentId: (incidentId, callback) => {
        const query = 'SELECT * FROM incidenthistory WHERE IncidentID = ?';
        db.query(query, [incidentId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findByUserId: (userId, callback) => {
        const query = 'SELECT * FROM incidenthistory WHERE UserID = ?';
        db.query(query, [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = {
    create: promisify(IncidentHistory.create),
    findAll: promisify(IncidentHistory.findAll),
    findById: promisify(IncidentHistory.findById),
    update: promisify(IncidentHistory.update),
    delete: promisify(IncidentHistory.delete),
    findByIncidentId: promisify(IncidentHistory.findByIncidentId),
    findByUserId: promisify(IncidentHistory.findByUserId),
};
