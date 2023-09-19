const express = require('express');
const router = express.Router();

// Import the Article model (assuming you've created a model for articles)
const Article = require('../models/article');

// Route to get all articles
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get a single article by ID
router.get('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.json(article);
  } catch (error) {
    res.status(404).json({ message: 'Article not found' });
  }
});

// Add more routes for creating, updating, and deleting articles as needed

module.exports = router;
