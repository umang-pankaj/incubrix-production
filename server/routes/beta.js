import express from 'express';
import rateLimit from 'express-rate-limit';
import { betaUserStore } from '../models/BetaUser.js';
import { betaEmailService } from '../services/betaEmailService.js';

const router = express.Router();

const betaRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: 'Too many signup attempts. Please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(str) {
    if (!str) return '';
    return String(str).replace(/[<>]/g, '').trim();
}

/**
 * @route   POST /api/beta/signup
 * @desc    Register a new beta user
 * @access  Public
 */
router.post('/signup', betaRateLimiter, async (req, res, next) => {
    try {
        const name = sanitize(req.body.name);
        const channelName = sanitize(req.body.channelName);
        const email = sanitize(req.body.email);
        const contactNumber = sanitize(req.body.contactNumber);
        const creatorType = sanitize(req.body.creatorType);
        const primaryPlatform = sanitize(req.body.primaryPlatform);
        const linkedinUrl = sanitize(req.body.linkedinUrl);

        // Sanitize channel links array
        let channelLinks = null;
        if (Array.isArray(req.body.channelLinks)) {
            channelLinks = req.body.channelLinks
                .map(l => sanitize(l))
                .filter(l => l.length > 0);
            if (channelLinks.length === 0) channelLinks = null;
        }

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required.',
            });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address.',
            });
        }

        const exists = await betaUserStore.emailExists(email);
        if (exists) {
            return res.status(409).json({
                success: false,
                message: 'You are already registered for beta access with this email.',
            });
        }

        const user = await betaUserStore.createUser({
            name,
            channelName: channelName || null,
            email,
            channelLinks,
            contactNumber: contactNumber || null,
            creatorType: creatorType || null,
            primaryPlatform: primaryPlatform || null,
            linkedinUrl: linkedinUrl || null,
        });

        console.log(`🎉 New beta signup: ${user.name} (${user.email})`);

        betaEmailService.sendBetaConfirmation(user).catch(console.error);
        betaEmailService.notifyAdmin(user).catch(console.error);

        return res.status(201).json({
            success: true,
            message: 'Thank you! Please check your email for confirmation.',
        });
    } catch (error) {
        if (error.message === 'DUPLICATE_EMAIL') {
            return res.status(409).json({
                success: false,
                message: 'You are already registered for beta access with this email.',
            });
        }
        console.error('❌ Beta signup error:', error);
        next(error);
    }
});


export default router;
