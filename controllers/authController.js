const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
    const { name, email, password, role, empid } = req.body;
     
    console.log(req.body);

    //if (!email || !password || !role || !name || !empId) {
    //   return res.status(400).send({ message: 'Missing required fields' });
    //}//

    const newUser = {
        email,
        password,
        role,
        name,
        empid
    };

    User.create(newUser, (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).send({ message: 'Error creating user' });
        }
        res.status(201).send({ message: 'User created successfully' });
    });
};

exports.login = (req, res) => {
    User.findByEmail(req.body.email, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send({ message: 'User not found' });

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) return res.status(401).send({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id, role: user.role }, 'secret', { expiresIn: 86400 });
        res.status(200).send({ token });
    });
};

exports.userById = (req, res) => {
    const userId = req.params.id; // Assuming the user ID is passed as a URL parameter

    User.findById(userId, (err, user) => {
        if (err) {
            console.error('Error fetching user by ID:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    });
};

exports.getAllUser = (req, res) => {
    User.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};
