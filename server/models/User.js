import bcrypt from 'bcrypt';

/**
 * Simple in-memory user storage
 * In production, replace this with a real database (MongoDB, PostgreSQL, etc.)
 */
class UserStore {
    constructor() {
        this.users = new Map(); // email -> user object
    }

    /**
     * Create a new user
     */
    async createUser(email, password, name) {
        if (this.users.has(email)) {
            throw new Error('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            id: Date.now().toString(),
            email,
            password: hashedPassword,
            name,
            provider: 'email',
            isVerified: false, // Default to false for email signups
            otp: null,
            otpExpires: null,
            createdAt: new Date(),
        };

        this.users.set(email, user);

        // Return user without password and otp
        const { password: _, otp: __, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    /**
     * Find user by email
     */
    async findByEmail(email) {
        return this.users.get(email) || null;
    }

    // Update user OTP
    async setOtp(email, otp) {
        const user = this.users.get(email);
        if (!user) return false;

        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        this.users.set(email, user);
        return true;
    }

    // Verify OTP
    async verifyOtp(email, otp) {
        const user = this.users.get(email);
        if (!user) return { success: false, message: 'User not found' };

        if (user.otp !== otp) {
            return { success: false, message: 'Invalid OTP' };
        }

        if (new Date() > user.otpExpires) {
            return { success: false, message: 'OTP expired' };
        }

        // OTP valid
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        this.users.set(email, user);

        return { success: true };
    }

    /**
     * Verify password
     */
    async verifyPassword(email, password) {
        const user = await this.findByEmail(email);
        if (!user) {
            return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return null;
        }

        // Return user without password and otp
        const { password: _, otp: __, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    /**
     * Find or create user (for OAuth)
     */
    async findOrCreateOAuthUser(profile) {
        const user = await this.findByEmail(profile.email);

        if (user) {
            return user;
        }

        // Create new user from OAuth profile
        const newUser = {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            picture: profile.picture || '',
            provider: profile.provider || 'google',
            createdAt: new Date(),
        };

        this.users.set(profile.email, newUser);
        return newUser;
    }
}

// Export singleton instance
export const userStore = new UserStore();
