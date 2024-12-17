const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const wrklctnRoutes  = require('./routes/wrklctnRoutes');
const typeRouter = require('./routes/typeRoutes');
const severityRoutes = require('./routes/severityRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const subcategoryRouter = require('./routes/subcategoryRoutes');
const statusRouter = require('./routes/statusRoutes');
const repeatedRouter = require('./routes/repeatedRoutes');
const behaviourRouter = require('./routes/behaviourRoutes');

const cors = require('cors');
const db = require('./config/db'); 

const app = express();

// Middleware
app.use(bodyParser.json());

// Enable CORS with specific options
const allowedOrigins = [
    'http://localhost:3000',
    'https://incident-frontend.netlify.app'
];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api',wrklctnRoutes);
app.use('/api',typeRouter);
app.use('/api', severityRoutes);
app.use('/api', categoryRouter);
app.use('/api', subcategoryRouter);
app.use('/api', statusRouter);
app.use('/api', repeatedRouter);
app.use('/api' ,behaviourRouter);
app.use('/api', require('./routes/incidentHistoryRoutes'));
// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
