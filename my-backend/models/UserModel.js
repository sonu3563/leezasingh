// /models/UserModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, required: true },
    password: { 
        type: String, 
        required: true, 
        minlength: [8, 'Password must be at least 8 characters long']
    }
});

module.exports = mongoose.model('User', userSchema);
