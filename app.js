require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const connectDB = require('./config/db');  // Import the database connection function

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON data from incoming requests
app.use(express.json());

// Import recipe routes
const recipeRoutes = require('./routes/recipe.routes');
app.use('/recipes', recipeRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
