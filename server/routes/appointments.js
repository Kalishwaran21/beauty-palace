const express = require('express');
const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const { protect } = require('../middleware/auth');
const router = express.Router();

// POST /api/appointments - Create guest appointment
router.post('/', async (req, res) => {
    try {
        const { guestName, guestPhone, services, date, timeSlot, notes } = req.body;
        
        if (!guestName || !guestPhone) {
            return res.status(400).json({ message: 'Name and Phone Number are required' });
        }
        if (!services || services.length === 0) {
            return res.status(400).json({ message: 'Please select at least one service' });
        }

        // Fetch selected services from DB to securely calculate total amount
        const dbServices = await Service.find({ _id: { $in: services } });
        const totalAmount = dbServices.reduce((sum, service) => sum + service.price, 0);

        const appointment = await Appointment.create({
            guestName, guestPhone, services, totalAmount, date, timeSlot, notes
        });
        
        const populated = await appointment.populate('services', 'name price duration');
        res.status(201).json(populated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
