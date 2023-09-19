const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  publicationDate: String,
  categoryTags: String,
  readTime: String, // example: 5 minutes read time
  subText: String, // description on the front page
  content: String, // article content
  image: String, // URL or path to the image file
  sourcesAndReferences: String, // if article references other sources
  // Other fields
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
