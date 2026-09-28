const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const verifyToken = require('../middlewares/authMiddleware');

// Register
router.post('/register', async (req, res) => {
    const { username, password, fullName, phone, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Username, password, and email are required.' });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            fullName,
            phone,
            email
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

// GET Profile
router.get('/profile', verifyToken, async (req, res) => {
    try {
        console.log('GET /profile accessed'); // Debug akses rute
        const user = await User.findById(req.userId).select('-password'); // Query user tanpa password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Profile
router.put('/profile', verifyToken, async (req, res) => {
    console.log('Rute /user/profile diakses'); // Debug akses rute
    const { fullName, phone, email } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { fullName, phone, email },
            { new: true, runValidators: true, context: 'query' }
        ).select('-password'); // Hapus password dari hasil query

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error.message);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
});

module.exports = router;