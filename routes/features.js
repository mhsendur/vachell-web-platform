const express = require('express');
const router = express.Router();

// Import the Feature model (assuming you've created a model for features)
const Feature = require('../models/feature');

// Route to get all features
router.get('/features', async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get a single feature by ID
router.get('/features/:id', async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    res.json(feature);
  } catch (error) {
    res.status(404).json({ message: 'Feature not found' });
  }
});

// Add more routes for creating, updating, and deleting features as needed

module.exports = router;
