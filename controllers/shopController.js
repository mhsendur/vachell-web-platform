const ShopItem = require('../models/shopItem');

// Create a new shop item
exports.createShopItem = async (req, res) => {
  const { title, description, productCategory, productType, 
    price, image, additionalImage, additionalInfo} = req.body;
  const shopItem = new ShopItem({ title, description, productCategory, productType, 
    price, image, additionalImage, additionalInfo });
  await shopItem.save();
  res.status(201).json(shopItem);
};

// Get all shop items
exports.getAllShopItems = async (req, res) => {
  const shopItems = await ShopItem.find();
  res.json(shopItems);
};

