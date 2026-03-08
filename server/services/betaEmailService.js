import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

class BetaEmailService {
    constructor() {
        this.senderEmail = process.env.SENDGRID_VERIFIED_SENDER || 'noreply@incubrix.com';
        this.adminEmail = process.env.ADMIN_EMAIL || 'contact@incubrix.com';
    }

    /**
     * Send beta confirmation email to the user.
     */
    async sendBetaConfirmation(user) {
        if (!process.env.SENDGRID_API_KEY) {
            console.warn('⚠️ SendGrid API Key not configured. Skipping beta confirmation email.');
            return;
        }

        const msg = {
            to: user.email,
            from: this.senderEmail,
            subject: "You're on the Incubrix Beta List 🚀",
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0e27; color: #ffffff; border-radius: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #06b6d4, #3b82f6); padding: 40px 30px; text-align: center;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">Welcome to the Beta! 🚀</h1>
                        <p style="margin: 10px 0 0; font-size: 14px; color: rgba(255,255,255,0.85);">You're one step closer to the future of content creation</p>
                    </div>
                    
                    <div style="padding: 35px 30px;">
                        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Hi <strong>${user.name}</strong>,</p>
                        
                        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                            Thank you for signing up for the <strong>Incubrix Beta Program</strong>.
                        </p>
                        
                        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                            We're excited to have you as an early user. Our team will review your submission and notify you once beta access is granted.
                        </p>
                        
                        <div style="background: rgba(6, 182, 212, 0.1); border-left: 4px solid #06b6d4; padding: 15px 20px; border-radius: 0 8px 8px 0; margin: 25px 0;">
                            <p style="margin: 0; font-size: 14px; color: #94a3b8;">Your Status</p>
                            <p style="margin: 5px 0 0; font-size: 18px; font-weight: 600; color: #06b6d4;">Pending Review ⏳</p>
                        </div>
                        
                        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 5px;">Stay tuned.</p>
                        <p style="font-size: 16px; line-height: 1.6; margin: 0; color: #94a3b8;">– Team Incubrix</p>
                    </div>
                    
                    <div style="padding: 20px 30px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
                        <p style="margin: 0; font-size: 12px; color: #64748b;">© 2026 IncuBrix Pte. Ltd. | AI-powered Creator Operating System</p>
                    </div>
                </div>
            `,
        };

        try {
            await sgMail.send(msg);
            console.log(`✅ Beta confirmation email sent to ${user.email}`);
        } catch (error) {
            console.error('❌ Failed to send beta confirmation email:', error.response?.body || error.message);
        }
    }

    /**
     * Notify admin of a new beta signup.
     */
    async notifyAdmin(user) {
        if (!process.env.SENDGRID_API_KEY) {
            console.warn('⚠️ SendGrid API Key not configured. Skipping admin notification.');
            return;
        }

        const msg = {
            to: this.adminEmail,
            from: this.senderEmail,
            subject: `[BETA SIGNUP] New registration: ${user.name}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h2 style="color: #06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">🚀 New Beta Signup</h2>
                    <table style="width:100%; border-collapse:collapse;">
                        <tr><td style="padding:6px 0;font-weight:600;width:170px;">ID:</td><td>${user.id}</td></tr>
                        <tr><td style="padding:6px 0;font-weight:600;">Name:</td><td>${user.name}</td></tr>
                        <tr><td style="padding:6px 0;font-weight:600;">Channel Name:</td><td>${user.channelName || 'N/A'}</td></tr>
                        <tr><td style="padding:6px 0;font-weight:600;">Email:</td><td>${user.email}</td></tr>
                        <tr><td style="padding:6px 0;font-weight:600;">Contact:</td><td>${user.contactNumber || 'N/A'}</td></tr>
                        <tr><td style="padding:6px 0;font-weight:600;">Creator Type:</td><td>${user.creatorType || 'N/A'}</td></tr>
                        <tr><td style="padding:6px 0;font-weight:600;">Primary Platform:</td><td>${user.primaryPlatform || 'N/A'}</td></tr>
                        <tr><td style="padding:6px 0;font-weight:600;">LinkedIn URL:</td><td>${user.linkedinUrl || 'N/A'}</td></tr>
                        <tr><td style="padding:6px 0;font-weight:600;">Channel Links:</td><td>${user.channelLinks ? user.channelLinks.join(', ') : 'N/A'}</td></tr>
                        <tr><td style="padding:6px 0;font-weight:600;">Status:</td><td>${user.status}</td></tr>
                        <tr><td style="padding:6px 0;font-weight:600;">Registered:</td><td>${user.createdAt}</td></tr>
                    </table>
                </div>
            `,
        };

        try {
            await sgMail.send(msg);
            console.log(`✅ Admin notified of beta signup: ${user.email}`);
        } catch (error) {
            console.error('❌ Failed to send admin beta notification:', error.response?.body || error.message);
        }
    }
}

export const betaEmailService = new BetaEmailService();
