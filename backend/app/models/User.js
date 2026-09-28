const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true }, // Full name is now required
    phone: { type: String, required: true }, // Phone is now required
    email: { type: String, required: true, unique: true }, // Email field added
    createdAt: { type: Date, default: Date.now }, // Track when the user was created
});

module.exports = mongoose.model('User', userSchema);
