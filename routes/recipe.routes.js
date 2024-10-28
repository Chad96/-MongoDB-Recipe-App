const express = require('express');
const Recipe = require('../models/recipe.model');
const router = express.Router();
const multer = require('multer');

// Set up multer for file uploads
const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10 MB
    storage: multer.memoryStorage(), // Store files in memory
});

// POST /recipes - Add a new recipe with an image upload
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const newRecipe = new Recipe({
            ...req.body,
            image: req.file ? req.file.buffer.toString('base64') : null, // Convert image buffer to base64 if needed
        });
        const recipe = await newRecipe.save();
        res.status(201).json(recipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET /recipes - Get all recipes with pagination
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const recipes = await Recipe.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Recipe.countDocuments();
        res.json({
            recipes,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /recipes/:id - Get a recipe by ID
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /recipes/:id - Delete a recipe by ID
router.delete('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json({ message: 'Recipe deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /recipes/:id - Update a recipe by ID
router.put('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
