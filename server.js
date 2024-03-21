//server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const crypto = require('crypto');
const nodemailer = require('nodemailer'); 
const app = express();
const PORT = 5000;

// Use cors middleware
app.use(cors());
//'mongodb+srv://doadmin:284o905Os3M1iJQK@db-mongodb-nyc3-20377-2e257ee2.mongo.ondigitalocean.com/admin?tls=true&authSource=admin',
// Connected to MongoDB
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

// Create a SellerInfo schema
const sellerInfoSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    city: String,
    address: String,
    postalCode: String,
    phoneNumber: String,
    email: String,
  });
  
  // Create a SellerInfo model
  const SellerInfo = mongoose.model('SellerInfo', sellerInfoSchema);

  const buyerInfoSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    address: String,
    city: String,
    postalCode: String,
    campus: String, // Added field for selecting campus
});

// Create a BuyerInfo model
const BuyerInfo = mongoose.model('BuyerInfo', buyerInfoSchema);

// Create a Product schema
const productSchema = new mongoose.Schema({
    title: String,
    pictures: [String], 
    description: String,
    rating: Number,
    price: String,
    category: String,
    bookType: String, 
    otherBookType: String, 
    authorName: String, 
    condition: String,
    isNegotiationEnabled: Boolean,
    publicationYear: String, 
    publisher: String,
    language: String, 
    otherLanguage: String, 
    isbn: String, 
    pageCount: String,
    fabric: String,
    color: String,
    stitchPreference: String, 
    size: String, 
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

// Function to send a password reset email
function sendPasswordResetEmail(email, resetToken) {
    console.log('Sending password reset email to:', email);
    console.log('Reset token:', resetToken);
  
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zaynabusama15@gmail.com',
            pass: 'brldcphuugfjrodq',
        },
    });
  
    const mailOptions = {
        from: 'zaynabusama15@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: http://localhost:3000/reset-password/${resetToken}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// Add product endpoint
app.post('/api/add-product', async (req, res) => {
  const { title,
    pictures,
    description,
    rating,
    price,
    category,
    bookType,
    otherBookType,
    authorName,
    condition,
    isNegotiationEnabled,
    publicationYear,
    publisher,
    language,
    otherLanguage,
    isbn,
    pageCount,
    fabric,
    color,
    stitchPreference,
    size, } = req.body;

  try {
      const newProduct = new Product({
        title,
        pictures,
        description,
        rating,
        price,
        category,
        bookType,
        otherBookType,
        authorName,
        condition,
        isNegotiationEnabled,
        publicationYear,
    publisher,
    language,
    otherLanguage,
    isbn,
    pageCount,
        fabric,
        color,
        stitchPreference,
        size,
      });

      await newProduct.save();

      res.json({ message: 'Product added successfully' });
  } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Add seller information endpoint
app.post('/api/save-seller-info', async (req, res) => {
    console.log('Request to /api/save-seller-info:', req.body);
    const { firstName, lastName, city, address, postalCode, phoneNumber, email } = req.body;
  
    try {
      const newSellerInfo = new SellerInfo({
        firstName,
        lastName,
        city,
        address,
        postalCode,
        phoneNumber,
        email,
      });
  
      await newSellerInfo.save();
  
      res.json({ message: 'Seller information saved successfully' });
    } catch (error) {
      console.error('Error saving seller information:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  // Buyer info endpoint
app.post('/api/buyer-info', async (req, res) => {
  const { email, firstName, lastName, phoneNumber, address, city, postalCode, campus } = req.body;

  try {
      const newBuyerInfo = new BuyerInfo({
          email,
          firstName,
          lastName,
          phoneNumber,
          address,
          city,
          postalCode,
          campus,
      });

      await newBuyerInfo.save();

      res.json({ message: 'Buyer information saved successfully' });
  } catch (error) {
      console.error('Error saving buyer information:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


  // Fetch all products endpoint
app.get('/api/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Fetch all products endpoint with search functionality
  app.get('/api/products', async (req, res) => {
    try {
      const { search } = req.query;
      let query = {};
  
      // If a search query is provided, update the query object
      if (search) {
        // Add conditions to search in relevant fields (e.g., title, description, category, etc.)
        query = {
          $or: [
            { title: { $regex: new RegExp(search, 'i') } }, // Case-insensitive title search
            { description: { $regex: new RegExp(search, 'i') } }, // Case-insensitive description search
            { category: { $regex: new RegExp(search, 'i') } }, // Case-insensitive category search
            
          ],
        };
      }
  
      const products = await Product.find(query);
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  // Fetch a single product by ID endpoint
app.get('/api/products/:productId', async (req, res) => {
    const { productId } = req.params;
  
    try {
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json(product);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Send confirmation email endpoint
app.post('/api/send-confirmation-email', async (req, res) => {
  const { type, email } = req.body;

  try {
    let recipientEmail;
    let subject;

    if (type === 'buyer') {
      recipientEmail = email;
      subject = 'Order Confirmation';
    } else if (type === 'seller') {
      recipientEmail = 'f2020-372@bnu.edu.pk'; // Replace with the seller's email
      subject = 'New Order Notification';
    } else {
      throw new Error('Invalid email type');
    }

    // Send email
    await sendConfirmationEmail(recipientEmail, subject);

    res.json({ message: 'Confirmation email sent successfully' });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Function to send confirmation email
async function sendConfirmationEmail(email, subject) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zaynabusama15@gmail.com', // Replace with your email
      pass: 'brldcphuugfjrodq', // Replace with your password
    },
  });

  const mailOptions = {
    from: 'zaynabusama15@gmail.com', // Replace with your email
    to: email,
    subject: subject,
    text: 'Your order has been confirmed.', // Customize the email content as needed
  };

  await transporter.sendMail(mailOptions);
}

  // Delete product endpoint
  app.delete('/api/delete-product/:productId', async (req, res) => {
    const { productId } = req.params;
  
    try {
      await Product.findByIdAndDelete(productId);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

});
