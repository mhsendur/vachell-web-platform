const express = require('express');
const bodyParser = require('body-parser'); // Middleware to parse request bodies
const mongoose = require('mongoose'); // MongoDB library

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('MONGDODBURL', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import the models
const Article = require('./models/article');
const Feature = require('./models/feature');
const ShopItem = require('./models/shop');


// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to Vachell!');
});

app.get('/routes/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/routes/features', async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/routes/shop', async (req, res) => {
  try {
    const shopItems = await ShopItem.find();
    res.json(shopItems);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/routes/articles', async (req, res) => {
  try {
    const { title, author, puplicationDate, categoryTags, readTime, subText, content, image, sourcesAndReferences } = req.body;
    const newArticle = new Article({
      title, author, puplicationDate, categoryTags, readTime, subText, content, image, sourcesAndReferences
    });
    await newArticle.save();
    res.status(201).json({ message: 'Article created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/routes/features', async (req, res) => {
  try {
    const { title,
      directorProducer,
      ReleaseDate,
      Genre,
      description,
      content,
      featuredImage,
      video
       } = req.body;
    const newFeature = new Feature({
      title,
      directorProducer,
      ReleaseDate,
      Genre,
      description,
      content,
      featuredImage,
      video
      
    });
    await newFeature.save();
    res.status(201).json({ message: 'Feature created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/routes/shop', async (req, res) => {
  try {
    const { title, description, productCategory, productType, 
      price, image, additionalImage, additionalInfo
    } = req.body;
    const newShopItem = new ShopItem({ title, description, productCategory, productType, 
      price, image, additionalImage, additionalInfo
    });
    await newShopItem.save();
    res.status(201).json({ message: 'Shop item created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/articles', (req, res) => {
  res.sendFile(__dirname + '/public/article-list.html');
});


// route for individual articles
app.get('/articles/:articleTitle', async (req, res) => {
  try {
    const articleTitle = req.params.articleTitle;

    // Find the article by title in your database
    const article = await Article.findOne({ title: articleTitle });

    if (!article) {
      // Handle the case when the article is not found
      res.status(404).send('Article not found');
      return;
    }

    // Serve HTML page for the article
    res.sendFile(__dirname + '/public/article.html');
  } catch (error) {
    console.error('Error serving article:', error);
    res.status(500).send('Server error');
  }
});

//route to get the content of a specific article
app.get('/articles/:articleTitle/content', async (req, res) => {
  try {
    const articleTitle = req.params.articleTitle;

    // Find article by title in your database
    const article = await Article.findOne({ title: articleTitle });

    if (!article) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }

    // Send the content of the article as JSON
    res.json(article);
  } catch (error) {
    console.error('Error serving article content:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route for the feature list page
app.get('/features', async (req, res) => {
  try {
    // Fetch a list of features from your database
    const features = await Feature.find();

    // Serve the HTML page for the feature list
    res.sendFile(__dirname + '/public/feature-list.html');
  } catch (error) {
    console.error('Error serving feature list page:', error);
    res.status(500).send('Server error');
  }
});

// A route for individual features
app.get('/features/:featureTitle', async (req, res) => {
  try {
    const featureTitle = req.params.featureTitle;

    // Find feature by title in your database
    const feature = await Feature.findOne({ title: featureTitle });

    if (!feature) {
      // Handle the case when the feature is not found
      res.status(404).send('Feature not found');
      return;
    }

    // Serve the HTML page for feature
    res.sendFile(__dirname + '/public/feature.html');
  } catch (error) {
    console.error('Error serving feature:', error);
    res.status(500).send('Server error');
  }
});

// Define a route to get the content of a specific feature
app.get('/features/:featureTitle/content', async (req, res) => {
  try {
    const featureTitle = req.params.featureTitle;

    // Find the feature by title in your database
    const feature = await Feature.findOne({ title: featureTitle });

    if (!feature) {
      // Handle the case when the feature is not found
      res.status(404).json({ error: 'Feature not found' });
      return;
    }

    // Send the content of the feature as JSON
    res.json(feature);
  } catch (error) {
    console.error('Error serving feature content:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/about-us', (req, res) => {
  res.sendFile(__dirname + '/public/about-us.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});


//Add the route to serve the HTML file
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const port = 3000; // or whatever port number you want to use

//Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});