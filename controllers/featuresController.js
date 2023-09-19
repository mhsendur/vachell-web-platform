const Feature = require('../models/feature');

// Create a new feature
exports.createFeature = async (req, res) => {
  const { title,
    directorProducer,
    ReleaseDate,
    Genre,
    description,
    content,
    featuredImage,
    video } = req.body;
  const feature = new Feature({ title,
    directorProducer,
    ReleaseDate,
    Genre,
    description,
    content,
    featuredImage,
    video });
  await feature.save();
  res.status(201).json(feature);
};

// Get all features
exports.getAllFeatures = async (req, res) => {
  const features = await Feature.find();
  res.json(features);
};

