// // server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const PORT = 5000;

// app.use(bodyParser.json());

// app.post('/api/signup', (req, res) => {
//     const { email, password } = req.body;
//     // Add logic to save the user data to a database or perform authentication
//     console.log('Received data on server:', email, password);
//     res.json({ message: 'Signup successful!' });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

// Connect to MongoDB (you'll need to have a MongoDB server running)
mongoose.connect('mongodb://localhost:27017/your-database-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create a User schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

// User registration endpoint
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Save the new user to the database
        const newUser = new User({ email, password });
        await newUser.save();

        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
    // Implement logic for user login
    // ...

    res.status(200).json({ message: 'Login successful' });
});

// Forget password endpoint
app.post('/api/forget-password', async (req, res) => {
    // Implement logic for forget password
    // ...

    res.status(200).json({ message: 'Password reset email sent' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

