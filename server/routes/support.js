import express from 'express';
import rateLimit from 'express-rate-limit';
import { ticketStore } from '../models/Ticket.js';
import { emailService } from '../services/emailService.js';

const router = express.Router();

// Rate limiting: prevent spam (max 3 tickets per 1 hour from same IP)
const ticketRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3,
    message: {
        success: false,
        message: 'Too many support requests. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * @route POST /api/support/ticket
 * @desc Create a new support ticket and send notifications
 */
router.post('/ticket', ticketRateLimiter, async (req, res, next) => {
    try {
        const { name, email, message, attachments } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'All required fields (Name, Email, Message) must be provided.'
            });
        }

        // 1. Create ticket in database (JSON storage)
        const ticket = await ticketStore.createTicket({ name, email, message, attachments });
        console.log(`🎫 New Ticket Created: ${ticket.id}`);

        // 2. Send Emails (Non-blocking)
        // Note: In a heavy production app, use a queue here.
        emailService.sendAdminNotification(ticket).catch(console.error);
        emailService.sendTicketConfirmation(ticket).catch(console.error);

        // 3. Return success response
        return res.status(201).json({
            success: true,
            message: 'Ticket successfully created.',
            ticketId: ticket.id
        });
    } catch (error) {
        console.error('❌ Error handling support ticket:', error);
        next(error);
    }
});

export default router;
