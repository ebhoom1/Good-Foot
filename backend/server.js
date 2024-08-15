const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const DB = require('./config/DB');  // Adjust the path if necessary

// Load environment variables from .env file
dotenv.config();

const app = express();

// Initialize MongoDB connection
DB();

// Middleware to parse JSON
app.use(express.json());

// Configure CORS to allow requests from any origin
// Middleware
app.use(cors({
    origin: ['http://192.168.20.3:4444'],
    credentials: true
}));

// Set up routes
const carbonEngineRoutes = require('./router/carbonEngine');
app.use('/api/carbon-engine', carbonEngineRoutes);

// Set up emission factor routes
const emissionFactorRoutes = require('./router/emissionFactorRoutes');
app.use('/api/emission-factors', emissionFactorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
