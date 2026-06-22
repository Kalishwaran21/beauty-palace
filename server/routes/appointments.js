const express = require('express');
const Appointment = require('../models/Appointment');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/appointments/my - Get my appointments
router.get('/my', protect, async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user._id })
            .populate('service', 'name price duration category')
            .sort({ date: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/appointments - Create appointment
router.post('/', protect, async (req, res) => {
    try {
        const { service, date, timeSlot, notes } = req.body;
        const appointment = await Appointment.create({
            user: req.user._id, service, date, timeSlot, notes
        });
        const populated = await appointment.populate('service', 'name price duration');
        res.status(201).json(populated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/appointments/:id/cancel - Cancel appointment
router.put('/:id/cancel', protect, async (req, res) => {
    try {
        const appointment = await Appointment.findOne({ _id: req.params.id, user: req.user._id });
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        appointment.status = 'cancelled';
        await appointment.save();
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
