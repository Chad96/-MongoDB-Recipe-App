const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String], // Array of strings for ingredients
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false, // Optional field, can add categories like 'dessert', 'main course', etc.
  },
  preparationTime: {
    type: Number, // Preparation time in minutes
    required: false,
  },
  cookingTime: {
    type: Number, // Cooking time in minutes
    required: true,
  },
  servings: {
    type: Number, // Number of servings
    required: false,
  },
  image: {
    type: String, // URL or file path for the image
    required: false,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
