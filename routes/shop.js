const express = require('express');
const router = express.Router();

// Import the ShopItem Model
const ShopItem = require('../models/shop');

// Route to get all shop items
router.get('/shop', async (req, res) => {
  try {
    const shopItems = await ShopItem.find();
    res.json(shopItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get a single shop item by ID
router.get('/shop/:id', async (req, res) => {
  try {
    const shopItem = await ShopItem.findById(req.params.id);
    res.json(shopItem);
  } catch (error) {
    res.status(404).json({ message: 'Shop item not found' });
  }
});

// Add more routes for creating, updating if needed

module.exports = router;
