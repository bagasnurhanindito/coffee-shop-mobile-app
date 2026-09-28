const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.error('MONGODB_URI is not defined in the environment variables');
    process.exit(1);
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes
const userRoutes = require('./app/routes/user');
const menuRoutes = require('./app/routes/menu');
const orderRoutes = require('./app/routes/order');

// Define Routes
app.use('/user', userRoutes);
app.use('/menu', menuRoutes);
app.use('/order', orderRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({
        message: 'An error occurred',
        error: err.message,
    });
});

// Fallback Route for Undefined Endpoints
app.use((req, res) => {
    console.warn(`404 - Endpoint not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: 'Endpoint not found' });
});

// Server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
