import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

class EmailService {
    constructor() {
        this.adminEmail = process.env.ADMIN_EMAIL || 'contact@incubrix.com';
        this.senderEmail = process.env.SENDGRID_VERIFIED_SENDER || 'no-reply@incubrix.com';
    }

    /**
     * Send structured admin notification when a new ticket is created.
     */
    async sendAdminNotification(ticket) {
        if (!process.env.SENDGRID_API_KEY) {
            console.warn('⚠️ SendGrid API Key not configured. Skipping admin notification.');
            return;
        }

        const msg = {
            to: this.adminEmail,
            from: this.senderEmail,
            subject: `[NEW TICKET] ${ticket.id}: Support Request from ${ticket.name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h2 style="color: #00d9ff; border-bottom: 2px solid #00d9ff; padding-bottom: 10px;">New Support Ticket</h2>
                    <p><strong>Ticket ID:</strong> ${ticket.id}</p>
                    <p><strong>Name:</strong> ${ticket.name}</p>
                    <p><strong>Email:</strong> ${ticket.email}</p>
                    <p><strong>Status:</strong> ${ticket.status}</p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
                        <h4 style="margin-top: 0;">Message:</h4>
                        <p style="white-space: pre-wrap;">${ticket.message}</p>
                    </div>
                    ${ticket.attachments && ticket.attachments.length > 0 ? `<p style="margin-top: 20px; color: #666;">📎 This ticket includes <strong>${ticket.attachments.length}</strong> attachment(s).</p>` : ''}
                </div>
            `,
            attachments: ticket.attachments || []
        };

        try {
            await sgMail.send(msg);
            console.log(`✅ Admin notification sent for ticket ${ticket.id}`);
        } catch (error) {
            console.error('❌ Failed to send admin notification:', error.response?.body || error.message);
        }
    }

    /**
     * Send professional confirmation email to the user.
     */
    async sendTicketConfirmation(ticket) {
        if (!process.env.SENDGRID_API_KEY) {
            console.warn('⚠️ SendGrid API Key not configured. Skipping user confirmation.');
            return;
        }

        const msg = {
            to: ticket.email,
            from: this.senderEmail,
            subject: `Support Ticket Received: ${ticket.id}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #0a0e27; color: white;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #00d9ff; font-size: 24px; margin: 0;">IncuBrix Support</h1>
                    </div>
                    
                    <p style="font-size: 16px;">Hi ${ticket.name},</p>
                    <p style="font-size: 16px;">We've received your support request and assigned it <strong>Ticket ID: ${ticket.id}</strong>.</p>
                    
                    <div style="background-color: rgba(0, 217, 255, 0.1); border-left: 4px solid #00d9ff; padding: 15px; margin: 25px 0;">
                        <h4 style="margin-top: 0; color: #00d9ff;">Your Query:</h4>
                        <p style="margin-bottom: 0; font-style: italic;">"${ticket.message}"</p>
                    </div>
                    
                    <p style="font-size: 16px;"><strong>Estimated Response Time:</strong> Within 24 hours.</p>
                    
                    <p style="font-size: 16px; margin-top: 30px;">Our team is currently reviewing your message and will get back to you soon.</p>
                    
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); font-size: 12px; color: #888; text-align: center;">
                        <p>© 2026 IncuBrix Pte. Ltd. | AI-powered Creator Operating System</p>
                    </div>
                </div>
            `,
        };

        try {
            await sgMail.send(msg);
            console.log(`✅ User confirmation sent for ticket ${ticket.id}`);
        } catch (error) {
            console.error('❌ Failed to send user confirmation:', error.response?.body || error.message);
        }
    }
}

export const emailService = new EmailService();
