import express from 'express';
import { calendarService } from '../services/calendarService.js';
import { bookingStore } from '../models/Booking.js';

const router = express.Router();

/**
 * @route   GET /api/booking/slots
 * @desc    Get available time slots for a specific date
 * @access  Public
 */
router.get('/slots', async (req, res, next) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ success: false, message: 'Date is required' });
        }

        const slots = await calendarService.getAvailableSlots(date);
        res.json({ success: true, slots });
    } catch (error) {
        console.error('Fetch Slots Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch available slots' });
    }
});

/**
 * @route   POST /api/booking/schedule
 * @desc    Schedule a new demo
 * @access  Public
 */
router.post('/schedule', async (req, res, next) => {
    try {
        const { name, email, purpose, startTime, endTime } = req.body;

        if (!name || !email || !purpose || !startTime || !endTime) {
            return res.status(400).json({
                success: false,
                message: 'All fields (name, email, purpose, startTime, endTime) are required'
            });
        }

        // Check for duplicates
        const isDuplicate = await bookingStore.checkDuplicate(email, startTime);
        if (isDuplicate) {
            return res.status(409).json({
                success: false,
                message: 'You already have a booking at this time'
            });
        }

        // Create Calendar Event
        const event = await calendarService.createBooking({
            name,
            email,
            purpose,
            startTime,
            endTime
        });

        // Store in DB
        const booking = await bookingStore.addBooking({
            name,
            email,
            purpose,
            startTime,
            endTime,
            calendarEventId: event.id,
            meetLink: event.hangoutLink
        });

        res.status(201).json({
            success: true,
            message: 'Demo scheduled successfully! Check your email for the invite.',
            booking
        });
    } catch (error) {
        console.error('Booking Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to schedule demo'
        });
    }
});

export default router;
