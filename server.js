const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/my', {
 // useNewUrlParser: true,
 // useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  resetToken: String,
  resetTokenExpiration: Date,
});

const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
  title: String,
  pictures: [String], // Array of picture URLs
  description: String,
  rating: Number,
  price: String,
  length: String,
  category: String,
});

const Product = mongoose.model('Product', productSchema);

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && user.password === password) {
      res.json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/forget-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const resetToken = crypto.randomBytes(20).toString('hex');

      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000;

      await user.save();

      sendPasswordResetEmail(user.email, resetToken);

      res.json({ message: 'Password reset instructions sent to your email' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error during forget password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/reset-password', async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    const user = await User.findOne({ email, resetToken: token, resetTokenExpiration: { $gt: Date.now() } });

    if (user) {
      user.password = newPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;

      await user.save();

      res.json({ message: 'Password reset successful' });
    } else {
      res.status(400).json({ message: 'Invalid or expired reset token' });
    }
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/fetch-email/:token', async (req, res) => {
  const { token } = req.params;

  try {
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

app.post('/api/add-product', async (req, res) => {
  const { title, pictures, description, rating, price, length, category } = req.body;

  try {
    const newProduct = new Product({
      title,
      pictures,
      description,
      rating,
      price,
      length,
      category,
    });

    await newProduct.save();

    res.json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});