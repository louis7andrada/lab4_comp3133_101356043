require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse JSON
app.use(bodyParser.json());

// Define the User schema with validation
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength: 4 },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    city: { type: String, required: true, match: /^[a-zA-Z\s]*$/ },
    website: { type: String, required: true, match: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ },
    zip: { type: String, required: true, match: /^\d{5}-\d{4}$/ },
    phone: { type: String, required: true, match: /^1-\d{3}-\d{3}-\d{4}$/ }
});

const User = mongoose.model('User', userSchema);

// POST endpoint to create a new user
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET endpoint to retrieve all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
