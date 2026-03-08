import express from 'express';
import passport from 'passport';
import { userStore } from '../models/User.js';

const router = express.Router();

/**
 * @route   GET /auth/google
 * @desc    Initiate Google OAuth flow
 * @access  Public
 */
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account'
    })
);

/**
 * @route   GET /auth/google/callback
 * @desc    Google OAuth callback route
 * @access  Public
 */
router.get(
    '/google/callback',
    (req, res, next) => {
        console.log('--- Google OAuth Callback Triggered ---');
        console.log('Query params:', req.query);

        passport.authenticate('google', (err, user, info) => {
            if (err) {
                console.error('Passport Auth Error:', err);
                return res.redirect(`${process.env.FRONTEND_URL}?auth=failed&error=${encodeURIComponent(err.message)}`);
            }
            if (!user) {
                console.error('Passport Auth Failed: No user found', info);
                const message = info?.message || 'no_user';
                return res.redirect(`${process.env.FRONTEND_URL}?auth=failed&error=${encodeURIComponent(message)}`);
            }

            console.log('Passport Auth Success. User found:', user.email);
            req.logIn(user, (err) => {
                if (err) {
                    console.error('Passport LogIn Error:', err);
                    return next(err);
                }
                console.log('Login successful, session established. Redirecting to frontend...');
                // Successful authentication, redirect to frontend
                return res.redirect(`${process.env.FRONTEND_URL}?auth=success`);
            });
        })(req, res, next);
    }
);

/**
 * @route   GET /auth/me
 * @desc    Get current authenticated user
 * @access  Private
 */
router.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            authenticated: true,
            user: req.user,
        });
    } else {
        res.status(401).json({
            authenticated: false,
            message: 'Not authenticated',
        });
    }
});

/**
 * @route   POST /auth/signup
 * @desc    Create new user account with email and password
 * @access  Public
 */

// Helper to generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

router.post('/signup', async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        // Validation
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: 'Email, password, and name are required',
            });
        }

        // Create user (unverified)
        await userStore.createUser(email, password, name);

        // Generate and set OTP
        const otp = generateOTP();
        await userStore.setOtp(email, otp);

        // MOCK SEND EMAIL - In production, use Nodemailer here
        console.log('------------------------------------------------');
        console.log(`📧 MOCK EMAIL TO: ${email}`);
        console.log(`🔒 OPT CODE: ${otp}`);
        console.log('------------------------------------------------');

        res.status(201).json({
            success: true,
            message: 'OTP sent to your email. Please verify.',
            requireOtp: true,
            email: email
        });
    } catch (error) {
        if (error.message === 'User already exists') {
            return res.status(409).json({
                success: false,
                message: 'An account with this email already exists',
            });
        }
        next(error);
    }
});

/**
 * @route   POST /auth/verify-otp
 * @desc    Verify OTP for user email
 * @access  Public
 */
router.post('/verify-otp', async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ success: false, message: 'Email and OTP are required' });
        }

        const result = await userStore.verifyOtp(email, otp);

        if (result.success) {
            res.json({
                success: true,
                message: 'Email verified successfully. You can now login.',
            });
        } else {
            res.status(400).json({
                success: false,
                message: result.message,
            });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /auth/login
 * @desc    Login with email and password
 * @access  Public
 */
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            });
        }

        // Verify credentials
        const user = await userStore.verifyPassword(email, password);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Check verification status
        if (user.isVerified === false) {
            return res.status(403).json({
                success: false,
                message: 'Email not verified. Please verify your email.',
                requireVerification: true
            });
        }

        // Log user in
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }

            res.json({
                success: true,
                message: 'Logged in successfully',
                user,
            });
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @route   POST /auth/logout
 * @desc    Logout user and destroy session
 * @access  Private
 */
router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }

            res.clearCookie('connect.sid');
            res.json({
                success: true,
                message: 'Logged out successfully',
            });
        });
    });
});

/**
 * @route   GET /auth/status
 * @desc    Check authentication status (alias for /auth/me)
 * @access  Public
 */
router.get('/status', (req, res) => {
    res.json({
        authenticated: req.isAuthenticated(),
        user: req.isAuthenticated() ? req.user : null,
    });
});

export default router;
