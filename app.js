require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON data from incoming requests with a higher limit
app.use(express.json({ limit: '100mb' }));

// Updated CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Manually set headers to ensure CORS configuration is applied to all requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Import and use recipe routes
const recipeRoutes = require('./routes/recipe.routes');
app.use('/recipes', recipeRoutes);

// Import and use user routes
const userRoutes = require('./routes/user.routes');  // Correct path to user routes
app.use('/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
