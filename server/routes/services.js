const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// GET /api/services - Get all active services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find({ isActive: true }).sort({ category: 1 });
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/services/:id
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
