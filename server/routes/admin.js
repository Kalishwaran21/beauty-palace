const express = require('express');
const User = require('../models/User');
const Service = require('../models/Service');
const Appointment = require('../models/Appointment');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// GET /api/admin/dashboard - Dashboard stats
router.get('/dashboard', protect, admin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalAppointments = await Appointment.countDocuments();
        const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
        const totalServices = await Service.countDocuments({ isActive: true });
        const recentAppointments = await Appointment.find()
            .populate('user', 'name email')
            .populate('service', 'name price')
            .sort({ createdAt: -1 })
            .limit(10);
        res.json({ totalUsers, totalAppointments, pendingAppointments, totalServices, recentAppointments });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/admin/appointments
router.get('/appointments', protect, admin, async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('user', 'name email phone')
            .populate('service', 'name price category')
            .sort({ createdAt: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/admin/appointments/:id - Update status
router.put('/appointments/:id', protect, admin, async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        ).populate('user', 'name email').populate('service', 'name price');
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/admin/services - Create service
router.post('/services', protect, admin, async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/admin/services/:id - Update service
router.put('/services/:id', protect, admin, async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE /api/admin/services/:id - Deactivate service
router.delete('/services/:id', protect, admin, async (req, res) => {
    try {
        await Service.findByIdAndUpdate(req.params.id, { isActive: false });
        res.json({ message: 'Service deactivated' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed default services
router.post('/seed', protect, admin, async (req, res) => {
    try {
        await Service.deleteMany({});
        const services = [
            { name: 'Haircut & Styling', category: 'Hair', description: 'Modern and classic cuts tailored to your face shape.', price: 800, duration: 45, imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400' },
            { name: 'Hair Color - Full', category: 'Hair', description: 'Complete hair coloring with premium quality products.', price: 2500, duration: 120, imageUrl: 'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?w=400' },
            { name: 'Balayage / Highlights', category: 'Hair', description: 'Hand-painted highlights for a natural sun-kissed look.', price: 3500, duration: 150, imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400' },
            { name: 'Keratin Hair Treatment', category: 'Hair', description: 'Smoothing treatment for frizz-free, shiny hair.', price: 4500, duration: 180, imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400' },
            { name: 'Hair Spa & Deep Conditioning', category: 'Hair', description: 'Nourishing hair spa to restore moisture and shine.', price: 1500, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400' },
            
            { name: 'Facial & Skin Treatment', category: 'Skin', description: 'Deep cleansing facial and skin rejuvenation.', price: 1200, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400' },
            { name: 'Advanced Anti-Aging Facial', category: 'Skin', description: 'Premium facial to reduce wrinkles and restore elasticity.', price: 2800, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400' },
            { name: 'Eyebrow Threading & Shaping', category: 'Skin', description: 'Precise threading for perfectly shaped eyebrows.', price: 150, duration: 20, imageUrl: 'https://images.unsplash.com/photo-1516975080661-460d3c01c03e?w=400' },
            { name: 'Full Body Waxing', category: 'Skin', description: 'Smooth, long-lasting hair removal for the whole body.', price: 2000, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=400' },
            
            { name: 'Bridal Makeup', category: 'Bridal', description: 'Flawless bridal looks for your most special day.', price: 8000, duration: 180, imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400' },
            { name: 'Pre-Bridal Package', category: 'Bridal', description: 'Complete head-to-toe preparation for brides.', price: 12000, duration: 300, imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400' },
            { name: 'Party Makeup', category: 'Bridal', description: 'Glamorous makeup for parties and events.', price: 2500, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1526045612212-70cb359b22b1?w=400' },
            
            { name: 'Manicure & Pedicure', category: 'Nails', description: 'Complete nail care with premium polish.', price: 700, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400' },
            { name: 'Acrylic Nail Extensions', category: 'Nails', description: 'Beautiful, long-lasting nail extensions.', price: 1800, duration: 120, imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400' },
            
            { name: 'Spa Massage Therapy', category: 'Spa', description: 'Relaxing full-body massage experience.', price: 2000, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400' },
            { name: 'Deep Tissue Massage', category: 'Spa', description: 'Intensive massage to relieve severe tension in muscle.', price: 3000, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400' },
            { name: 'Eyelash Extensions', category: 'Skin', description: 'Semi-permanent fibers applied to natural eyelashes.', price: 2000, duration: 120, imageUrl: 'https://images.unsplash.com/photo-1512496015851-a1c848daae54?w=400' }
        ];
        await Service.insertMany(services);
        res.json({ message: `${services.length} services seeded successfully!` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
