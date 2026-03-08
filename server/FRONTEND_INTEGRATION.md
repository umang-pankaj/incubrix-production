# Frontend Integration Guide

This guide explains how to integrate the Google OAuth authentication backend with your React frontend.

## Quick Start

### 1. Backend Setup

First, set up your backend environment:

```bash
cd server
cp .env.example .env
# Edit .env and add your Google OAuth credentials
npm install
npm start
```

### 2. Frontend Integration

Add authentication to your React components using the examples below.

---

## API Endpoints

All endpoints are available at `http://localhost:3001` (development) or your production backend URL.

### Authentication Endpoints

| Method | Endpoint | Description | Authentication Required |
|--------|----------|-------------|------------------------|
| GET | `/auth/google` | Initiates Google OAuth flow | No |
| GET | `/auth/google/callback` | OAuth callback (handled automatically) | No |
| GET | `/auth/me` | Get current user info | Yes |
| GET | `/auth/status` | Check authentication status | No |
| POST | `/auth/logout` | Logout and destroy session | Yes |
| GET | `/health` | Server health check | No |

---

## Example React Components

### 1. Login Component

```jsx
import { useState } from 'react';

export function LoginButton() {
  const handleLogin = () => {
    // Redirect to backend OAuth endpoint
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return (
    <button 
      onClick={handleLogin}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Sign in with Google
    </button>
  );
}
```

### 2. User Profile Component

```jsx
import { useState, useEffect } from 'react';

export function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/me', {
        credentials: 'include', // Important: include cookies
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <LoginButton />;
  }

  return (
    <div className="flex items-center gap-4">
      <img 
        src={user.picture} 
        alt={user.name}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="font-medium">{user.name}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
      <button 
        onClick={handleLogout}
        className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
```

### 3. Protected Route Component

```jsx
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/me', {
        credentials: 'include',
      });
      setIsAuthenticated(response.ok);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
```

### 4. Auth Callback Handler

Add this to your main App component to handle OAuth redirects:

```jsx
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const authStatus = searchParams.get('auth');
    
    if (authStatus === 'success') {
      console.log('Login successful!');
      // Show success message or redirect
      setSearchParams({}); // Clear URL params
    } else if (authStatus === 'failed') {
      console.error('Login failed');
      // Show error message
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  // Rest of your app...
}
```

---

## React Context Provider (Recommended)

For a better developer experience, create an auth context:

```jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/me`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  const logout = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

**Usage:**

```jsx
// In main.jsx
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

// In any component
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <button onClick={login}>Login with Google</button>
  );
}
```

---

## Environment Variables

Add to your `.env` file (frontend):

```env
VITE_BACKEND_URL=http://localhost:3001
```

For production:
```env
VITE_BACKEND_URL=https://your-backend-domain.com
```

---

## TypeScript Support

If using TypeScript, add these type definitions:

```typescript
// types/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  picture: string;
  provider: 'google';
}

export interface AuthResponse {
  authenticated: boolean;
  user: User | null;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}
```

---

## Important Notes

### CORS and Credentials

**Always include `credentials: 'include'`** in fetch requests to send cookies:

```javascript
fetch('http://localhost:3001/auth/me', {
  credentials: 'include',  // This is critical!
})
```

### Production Deployment

1. Update backend `.env` with production URLs:
   ```env
   FRONTEND_URL=https://your-frontend-domain.com
   BACKEND_URL=https://your-backend-domain.com
   NODE_ENV=production
   ```

2. Update frontend environment variable:
   ```env
   VITE_BACKEND_URL=https://your-backend-domain.com
   ```

3. Ensure your backend is deployed with HTTPS

4. Update Google OAuth authorized redirect URIs to include:
   - Development: `http://localhost:3001/auth/google/callback`
   - Production: `https://your-backend-domain.com/auth/google/callback`

### Session Storage

The current implementation uses in-memory sessions. For production:

1. Install a session store (e.g., Redis):
   ```bash
   npm install connect-redis redis
   ```

2. Update `server/index.js` session configuration:
   ```javascript
   import RedisStore from 'connect-redis';
   import { createClient } from 'redis';

   const redisClient = createClient();
   await redisClient.connect();

   app.use(session({
     store: new RedisStore({ client: redisClient }),
     // ... other options
   }));
   ```

---

## Error Handling

Handle authentication errors gracefully:

```jsx
const fetchWithAuth = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
    });

    if (response.status === 401) {
      // User not authenticated
      window.location.href = '/login';
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
```

---

## Testing the Integration

1. Start both servers:
   ```bash
   # Terminal 1 - Backend
   cd server
   npm start

   # Terminal 2 - Frontend
   npm run dev
   ```

2. Visit `http://localhost:5173`

3. Click "Sign in with Google"

4. Complete Google OAuth flow

5. You should be redirected back with `?auth=success` in the URL

6. Check `/auth/me` to verify user is logged in

---

## Troubleshooting

### "CORS error"
- Ensure `credentials: 'include'` is in all fetch requests
- Check backend CORS configuration allows your frontend URL

### "Session not persisting"
- Check cookie settings in browser DevTools
- Ensure `credentials: 'include'` is set
- In production, ensure HTTPS is enabled

### "Authentication fails"
- Verify Google OAuth credentials in `.env`
- Check authorized redirect URIs in Google Cloud Console
- Ensure callback URL matches exactly

### "User not found error"
- Check backend console for errors
- Verify Google account has email and profile access granted
