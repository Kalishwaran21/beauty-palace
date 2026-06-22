const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// POST /api/auth/login - Admin Login Only
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (user && await user.matchPassword(password)) {
            if (user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied. Admin only.' });
            }
            res.json({
                _id: user._id, name: user.name, email: user.email,
                role: user.role, token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/auth/init-admin - Securely initialize the very first admin account
router.get('/init-admin', async (req, res) => {
    try {
        const adminEmail = 'admin@larastyles.com';
        let admin = await User.findOne({ email: adminEmail });
        
        if (admin) {
            return res.json({ message: 'Admin already exists. You can log in.' });
        }
        
        admin = new User({
            name: 'System Admin',
            email: adminEmail,
            password: 'admin123',
            phone: '9876543210',
            role: 'admin'
        });
        await admin.save();
        res.status(201).json({ message: 'Admin user created successfully! You can now log in.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
