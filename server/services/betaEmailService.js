import dotenv from 'dotenv';

dotenv.config();

class BetaEmailService {
    constructor() {
        this.senderEmail = 'noreply@incubrix.com';
        this.adminEmail = process.env.ADMIN_EMAIL || 'support@incubrix.com';
    }

    /**
     * Send beta confirmation email to the user.
     */
    async sendBetaConfirmation(user) {
        console.log(`ℹ️ Beta confirmation pending Postmark integration. User email: ${user.email}`);
        return Promise.resolve();
    }

    /**
     * Notify admin of a new beta signup.
     */
    async notifyAdmin(user) {
        console.log(`ℹ️ Admin notification pending Postmark integration. User email: ${user.email}`);
        return Promise.resolve();
    }
}

export const betaEmailService = new BetaEmailService();
