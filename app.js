const express = require('express');
const db = require('./db'); // Require the db.js file
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose
  .connect('MONGODBURL', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});


// Middleware
app.use(express.json()); // Parse JSON requests

// Define routes
// app.js
const articlesRoutes = require('./routes/articles');
const featuresRoutes = require('./routes/features');
const shopRoutes = require('./routes/shop');

// Use the routes
app.use('/articles', articlesRoutes);
app.use('/features', featuresRoutes);
app.use('/shop', shopRoutes);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
