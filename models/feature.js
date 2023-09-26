const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  title: String,
  directorProducer: String,
  releaseDate: String,
  genre: String, // categorise the feature into different genres i.e. documentary, interview and short film
  description: String, // brief description of the feature
  content: String,
  featuredImage: String, // Thumbnail of the feature, URL of the feature
  video: String, // URL to the video content
}
);

const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;
