const Article = require('../models/article');

// Create a new article
exports.createArticle = async (req, res) => {
  const { title, author, puplicationDate, 
    categoryTags, readTime, subText, content, image, sourcesAndReferences } = req.body;
  const article = new Article({ title, author, puplicationDate, 
    categoryTags, readTime, subText, content, image, sourcesAndReferences });
  await article.save();
  res.status(201).json(article);
};

// Get all articles
exports.getAllArticles = async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
};

