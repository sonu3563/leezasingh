const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/UserModel');
const router = express.Router();
const nodemailer = require('nodemailer');
const sendEmail = require("../config/emailConfig"); // Import sendEmail function

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'manish@kolaborationventures.com', 
        pass: 'Tas@123#'   
    }
});
//generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

//Generate Rendom Password
const generateRandomPassword = () => {
    const password = crypto.randomBytes(5).toString('hex').slice(0, 9);
    console.log("Generated password:", password);
    return password;
};

//Verify JWT Token 
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided. Access denied.' });
    }

    console.log("Token received: ", token);

    const tokenWithoutBearer = token.split(' ')[1];

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
        req.userId = decoded.id;
        next();
    });
};

router.post("/signup", async (req, res) => {
    const { username, firstName, lastName, email, phoneNumber, role } = req.body;

    if (!username || !firstName || !lastName || !email || !phoneNumber || !role) {
        return res.status(400).json({ message: "Please provide all required fields." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email." });
        }

        const randomPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const newUser = new User({
            username,
            firstName,
            lastName,
            email,
            phoneNumber,
            role,
            password: hashedPassword,
        });

        await newUser.save();
        const token = generateToken(newUser._id);

        // Send Welcome Email
        const emailContent = `
            <h3>Welcome, ${firstName}!</h3>
            <p>Thank you for signing up. Here are your login details:</p>
            <ul>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Password:</strong> ${randomPassword}</li>
            </ul>
            <p><a href="https://yourwebsite.com/login">Click here to login</a></p>
            <p>We recommend changing your password after logging in.</p>
        `;

        const emailSent = await sendEmail(email, "Welcome to Our Platform!", emailContent);
        if (!emailSent) {
            console.error("Failed to send email.");
        }

        res.status(201).json({
            message: "Signup successful! Check your email for login details.",
            user: { username, firstName, lastName, email, phoneNumber, role },
            token,
        });
    } catch (err) {
        console.error("Error saving user:", err);
        res.status(500).json({ message: "Server error, please try again later." });
    }
});

// post rout for /api/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        const token = generateToken(user._id);

        res.status(200).json({
            message: 'Login successful!',
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role
            },
            token 
        });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
});

// PUT route for /api/update-profile
router.put('/update-profile', verifyToken, async (req, res) => {
    const { username, firstName, lastName, email, phoneNumber, role } = req.body;

    // Simple validation to check if the necessary fields are provided
    if (!username || !firstName || !lastName || !email || !phoneNumber || !role) {
        return res.status(400).json({ message: 'Please provide all the required fields (username, firstName, lastName, email, phoneNumber, role).' });
    }

    try {
        // Find the user by the ID from the JWT token
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the email or username is being updated and is already in use
        if (user.email !== email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already taken.' });
            }
        }

        if (user.username !== username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'Username is already taken.' });
            }
        }

        // Update the user profile
        user.username = username;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.role = role;

        // Save the updated user profile
        await user.save();

        // Respond with the updated user information
        res.status(200).json({
            message: 'Profile updated successfully!',
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
});

// GET route to fetch the profile of the logged-in user
router.get('/profile', verifyToken, async (req, res) => {
    try {
        // Find the user by their ID (which was saved in req.userId by the verifyToken middleware)
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Send the user's profile information in the response
        res.status(200).json({
            message: 'Profile fetched successfully!',
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
});
module.exports = router;