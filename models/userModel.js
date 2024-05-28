const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    create: (user, callback) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        const { email, password, role, name, empid } = user;
        const query = 'INSERT INTO users (email, password, role, name, empid) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [email, password, role, name, empid], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [id], callback);
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM users';
        db.query(query, callback);
    }
};

module.exports = User;
