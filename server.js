const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer'); // Import Nodemailer
const app = express();
const PORT = 5000;

// Use cors middleware
app.use(cors());

// Connect to MongoDB (you'll need to have a MongoDB server running)
mongoose.connect('mongodb://localhost:27017/my', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
});

// Create a User schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  resetToken: String,
  resetTokenExpiration: Date,
});

const User = mongoose.model('User', userSchema);

// Create a Product schema
const productSchema = new mongoose.Schema({
  title: String,
  picture: String,
  description: String,
  rating: Number,
  price: String,
});

const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.json());

// User registration endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    res.json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      // Successful login
      res.json({ message: 'Login successful!' });
    } else {
      // Login failed
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Forget password endpoint
app.post('/api/forget-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (user) {
      // Generate a unique reset token
      const resetToken = crypto.randomBytes(20).toString('hex');

      // Set the reset token and expiration in the user document
      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000; // Token expiration set to 1 hour

      // Save the user document with the reset token
      await user.save();

      // Send a password reset email with the reset token as part of the URL
      sendPasswordResetEmail(user.email, resetToken);

      res.json({ message: 'Password reset instructions sent to your email' });
    } else {
      // User not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error during forget password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reset password endpoint
app.post('/api/reset-password', async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    // Find the user with the provided email and reset token
    const user = await User.findOne({ email, resetToken: token, resetTokenExpiration: { $gt: Date.now() } });

    if (user) {
      // Update the password and clear the reset token
      user.password = newPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;

      // Save the updated user document
      await user.save();

      res.json({ message: 'Password reset successful' });
    } else {
      // Invalid or expired token
      res.status(400).json({ message: 'Invalid or expired reset token' });
    }
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch email associated with reset token endpoint
app.get('/api/fetch-email/:token', async (req, res) => {
  const { token } = req.params;

  try {
    // Find the user with the provided reset token
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });

    if (user) {
      res.json({ email: user.email });
    } else {
      res.status(404).json({ message: 'User not found or token expired' });
    }
  } catch (error) {
    console.error('Error fetching email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add product endpoint
app.post('/api/add-product', async (req, res) => {
  const { title, picture, description, rating, price } = req.body;

  try {
    const newProduct = new Product({
      title,
      picture,
      description,
      rating,
      price,
    });

    await newProduct.save();

    res.json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//ch
