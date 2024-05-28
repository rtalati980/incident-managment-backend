const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    

    if (!authHeader) {
        console.error(authHeader,'No authorization header provided');
        return res.status(403).send({ message: 'No authorization header provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    if (!token) {
        console.error('No token provided');
        return res.status(403).send({ message: 'No token provided' });
    }

    jwt.verify(token, 'secret', (err, decoded) => {  // Ensure the 'secret' is correct
        if (err) {
            console.error('Failed to authenticate token:', err.message);
            return res.status(500).send({ message: 'Failed to authenticate token' });
        }

        console.log('Decoded Token:', decoded);

        req.userId = decoded.id;
        req.userRole = decoded.role;

        console.log('User ID:', req.userId);
        console.log('User Role:', req.userRole);

        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        console.error('Requires admin role');
        return res.status(403).send({ message: 'Requires admin role' });
    }

    next();
};