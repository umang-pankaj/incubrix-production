import express from 'express';
import chatService from '../services/chatbot/chatService.js';
import { userStore } from '../models/User.js'; // Assuming we might want to check auth for admin routes

const router = express.Router();

/**
 * @route   POST /api/chat
 * @desc    Interact with the chatbot
 * @access  Public
 */
// Get initial presets (buttons)
router.get('/presets', async (req, res) => {
    // Return the loaded presets from ChatService
    // ChatService exposes them in this.presets
    res.json(chatService.presets);
});

router.post('/', async (req, res) => {
    try {
        const { message, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Message is required' });
        }

        const response = await chatService.processMessage(message, sessionId);

        res.json({
            success: true,
            ...response
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({ success: false, message: 'Server error processing chat' });
    }
});

/**
 * @route   POST /api/chat/reindex
 * @desc    Trigger knowledge base re-indexing
 * @access  Private (Admin only - simplified to check for specific header or just open for now/dev)
 */
router.post('/reindex', async (req, res) => {
    try {
        // In a real app, check for admin privileges here
        // const user = req.user;
        // if (!user || user.role !== 'admin') ...

        console.log('Manual reindex triggered via API');

        // Don't await the whole process, just trigger it
        chatService.reindex();

        res.json({
            success: true,
            message: 'Re-indexing started in background. This may take a few meetings.'
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to start re-indexing' });
    }
});

export default router;
