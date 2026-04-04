import dotenv from 'dotenv';

dotenv.config();

class EmailService {
    constructor() {
        this.adminEmail = process.env.ADMIN_EMAIL || 'support@incubrix.com';
        this.senderEmail = 'no-reply@incubrix.com';
    }

    /**
     * Send structured admin notification when a new ticket is created.
     */
    async sendAdminNotification(ticket) {
        console.log(`ℹ️ Admin notification pending Postmark integration. Ticket ID: ${ticket.id}`);
        return Promise.resolve();
    }

    /**
     * Send professional confirmation email to the user.
     */
    async sendTicketConfirmation(ticket) {
        console.log(`ℹ️ User confirmation pending Postmark integration. Ticket ID: ${ticket.id}`);
        return Promise.resolve();
    }
}

export const emailService = new EmailService();
