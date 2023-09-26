const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  title: String,
  description: String,
  productCategory: String, // categorise the product such as clothing, accessory, art, etc...
  productType: String, // categorise the product type such as tshirt, hoodie, posters, etc...
  price: Number,
  image: String, // URL or path to the product image
  additionalImage: String, // URL or path to additional images to add to the product
  additionalInfo: String, // additional information for the product shipment info etc...
}
);

const ShopItem = mongoose.model('ShopItem', shopSchema);

module.exports = ShopItem;
