import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { configurePassport } from './config/passport.js';
import authRoutes from './routes/auth.js';
import chatRouter from './routes/chat.js';
import supportRoutes from './routes/support.js';
import betaRoutes from './routes/beta.js';
import chatService from './services/chatbot/chatService.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'SESSION_SECRET',
    'FRONTEND_URL',
    'BACKEND_URL',
];

const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);
if (missingEnvVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
    console.error('Please create a .env file based on .env.example');
    process.exit(1);
}

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy - important for secure cookies in production behind reverse proxy
app.set('trust proxy', 1);

// CORS configuration
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://127.0.0.1:5173'
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        name: 'incubrix.sid', // Custom cookie name
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        },
    })
);

// Initialize Passport and restore authentication state from session
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    });
});

// Mount routes
app.use('/auth', authRoutes);
console.log('Mounting chatRouter...');
app.use('/api/chat', chatRouter);
app.use('/api/support', supportRoutes);
app.use('/api/beta', betaRoutes);

// 404 handler - must be after all routes
app.use(notFoundHandler);

// Global error handler - must be last
app.use(errorHandler);

// Start server
const server = app.listen(PORT, '0.0.0.0', async () => {
    console.log(`🚀 Authentication server started at ${new Date().toLocaleTimeString()}`);
    console.log(`📡 Server running on: http://127.0.0.1:${PORT}`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
    console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`);

    // Initialize Chatbot in background
    chatService.initialize().then(() => {
        console.log('🤖 Chatbot service initialization finished.');
    }).catch(e => {
        console.error('❌ Failed to initialize chatbot:', e);
    });
});

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error('================================================================');
        console.error(`❌ CRITICAL: Port ${PORT} is already in use.`);
        console.error('================================================================');
        console.error(`This usually means another terminal is already running the server.`);
        console.error(`Please kill the process using port ${PORT} and try again.`);
        console.error(`Run the provided 'start-server.ps1' script to automatically fix this.`);
        console.error('----------------------------------------------------------------');
        console.error(`Manual Windows Fix: netstat -ano | findstr :${PORT}`);
        console.error(`Then: taskkill /F /PID <PID_FROM_PREVIOUS_COMMAND>`);
        console.error('================================================================');
        process.exit(1);
    } else {
        console.error('❌ Server error:', error);
    }
});
