import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { userStore } from '../models/User.js';

/**
 * Configure Passport with Google OAuth 2.0 Strategy
 */
export function configurePassport() {
  console.log('--- Configuring Google Strategy ---');
  console.log('Callback URL:', `${process.env.BACKEND_URL}/auth/google/callback`);

  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
        scope: ['profile', 'email'],
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('--- Google Profile Received ---');
          console.log('Profile ID:', profile.id);
          console.log('Email:', profile.emails?.[0]?.value);

          // Extract user information from Google profile
          const userProfile = {
            id: profile.id,
            email: profile.emails?.[0]?.value || '',
            name: profile.displayName,
            firstName: profile.name?.givenName || '',
            lastName: profile.name?.familyName || '',
            picture: profile.photos?.[0]?.value || '',
            provider: 'google',
          };

          // Find or create user in the store
          const user = await userStore.findOrCreateOAuthUser(userProfile);
          console.log('User synced with store successfully');

          return done(null, user);
        } catch (error) {
          console.error('Error in Google Strategy callback:', error);
          return done(error, null);
        }
      }
    )
  );

  // Serialize user for session storage
  // This determines what data is stored in the session
  passport.serializeUser((user, done) => {
    console.log('--- Serializing User ---');
    console.log('User ID:', user.id);
    done(null, user);
  });

  // Deserialize user from session
  // This retrieves the user object from session data
  passport.deserializeUser((user, done) => {
    console.log('--- Deserializing User ---');
    console.log('User Email:', user.email);
    // In a real application, you would:
    // 1. Query your database using the user ID
    // 2. Return the full user object
    done(null, user);
  });
}
