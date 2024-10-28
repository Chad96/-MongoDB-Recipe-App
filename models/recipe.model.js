// Recipe.js
const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  preparationTime: {
    type: Number,
    required: false,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  servings: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
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
