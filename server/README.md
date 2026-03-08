# Google OAuth Authentication Server

Production-ready Google OAuth 2.0 authentication backend using Express.js, Passport.js, and express-session.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` and add your Google OAuth credentials:

```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
SESSION_SECRET=your-super-secret-random-string
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3001
NODE_ENV=development
PORT=3001
```

### 3. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
5. Choose **Web application**
6. Add authorized redirect URIs:
   - Development: `http://localhost:3001/auth/google/callback`
   - Production: `https://your-backend-domain.com/auth/google/callback`
7. Copy the Client ID and Client Secret to your `.env` file

### 4. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3001`

For development with auto-reload:
```bash
npm run dev
```

## 📝 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/auth/google` | Initiates Google OAuth flow |
| `GET` | `/auth/google/callback` | OAuth callback (automatic) |
| `GET` | `/auth/me` | Get current authenticated user |
| `GET` | `/auth/status` | Check authentication status |
| `POST` | `/auth/logout` | Logout and destroy session |
| `GET` | `/health` | Server health check |

### Example Responses

**GET /auth/me** (authenticated)
```json
{
  "authenticated": true,
  "user": {
    "id": "123456789",
    "email": "user@example.com",
    "name": "John Doe",
    "firstName": "John",
    "lastName": "Doe",
    "picture": "https://...",
    "provider": "google"
  }
}
```

**GET /auth/me** (not authenticated)
```json
{
  "authenticated": false,
  "message": "Not authenticated"
}
```

## 🧪 Testing

Open `test.html` in your browser for a standalone test interface:

```bash
cd server
# Open test.html in your browser
# Or use a simple HTTP server:
npx serve .
```

Then navigate to `http://localhost:3000/test.html`

## 🔗 Frontend Integration

See [FRONTEND_INTEGRATION.md](./FRONTEND_INTEGRATION.md) for detailed integration examples with React, including:

- Login/Logout components
- Protected routes
- Auth context provider
- TypeScript types
- Error handling

## 🏗️ Project Structure

```
server/
├── index.js                    # Main Express server
├── config/
│   └── passport.js            # Passport.js configuration
├── routes/
│   └── auth.js                # Authentication routes
├── middleware/
│   └── errorHandler.js        # Error handling middleware
├── .env.example               # Environment variables template
├── .env                       # Your local config (git-ignored)
├── package.json               # Dependencies
├── test.html                  # Standalone test page
├── README.md                  # This file
└── FRONTEND_INTEGRATION.md    # Frontend integration guide
```

## 🔒 Security Features

- ✅ Secure session management with httpOnly cookies
- ✅ CORS configuration for cross-origin requests
- ✅ Environment-based configuration (dev/production)
- ✅ Session secret encryption
- ✅ XSS protection via httpOnly cookies
- ✅ HTTPS enforcement in production
- ✅ SameSite cookie protection

## 🌐 Production Deployment

### Environment Variables

Update your `.env` for production:

```env
NODE_ENV=production
FRONTEND_URL=https://incubrix.base44.app
BACKEND_URL=https://your-backend-domain.com
SESSION_SECRET=<generate-strong-random-string>
GOOGLE_CLIENT_ID=<your-production-client-id>
GOOGLE_CLIENT_SECRET=<your-production-client-secret>
```

### Session Store

⚠️ **Important**: The current implementation uses in-memory session storage. For production, use a persistent store:

**Redis Example:**

```bash
npm install connect-redis redis
```

Update `index.js`:

```javascript
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL
});
await redisClient.connect();

app.use(session({
  store: new RedisStore({ client: redisClient }),
  // ... rest of session config
}));
```

### HTTPS

Ensure your production backend is served over HTTPS. This is required for secure cookies to work properly.

### Google OAuth Configuration

Update authorized redirect URIs in Google Cloud Console to include your production backend URL.

## 🐛 Troubleshooting

### CORS Errors

Make sure:
- `FRONTEND_URL` in `.env` matches your frontend domain exactly
- Fetch requests include `credentials: 'include'`

### Session Not Persisting

- Check that cookies are enabled in browser
- Verify `credentials: 'include'` in all API calls
- In production, ensure HTTPS is enabled

### Authentication Fails

- Verify Google OAuth credentials are correct
- Check authorized redirect URIs match exactly
- Ensure the callback URL includes the correct protocol (http/https)

## 📦 Dependencies

- **express** - Web framework
- **passport** - Authentication middleware
- **passport-google-oauth20** - Google OAuth 2.0 strategy
- **express-session** - Session middleware
- **cors** - CORS middleware
- **dotenv** - Environment variable management
- **cookie-parser** - Cookie parsing

## 📄 License

ISC

## 🤝 Support

For issues or questions, refer to:
- [Passport.js Documentation](http://www.passportjs.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
