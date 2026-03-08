import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const apiKey = process.env.SENDGRID_API_KEY;
const sender = process.env.SENDGRID_VERIFIED_SENDER;
const admin = process.env.ADMIN_EMAIL;

console.log('--- SendGrid Diagnostic ---');
console.log('API Key length:', apiKey ? apiKey.length : 0);
console.log('Sender:', sender);
console.log('Admin:', admin);

if (!apiKey || !sender) {
    console.error('❌ Missing API Key or Sender Email in .env');
    process.exit(1);
}

sgMail.setApiKey(apiKey);

const msg = {
    to: admin,
    from: sender,
    subject: 'IncuBrix - SendGrid Diagnostic Test',
    text: 'If you are reading this, your SendGrid configuration is working correctly.',
    html: '<strong>If you are reading this, your SendGrid configuration is working correctly.</strong>',
};

console.log('Sending test email...');

sgMail.send(msg)
    .then(() => {
        console.log('✅ Success! The test email has been sent.');
    })
    .catch((error) => {
        console.error('❌ Failed to send email.');
        if (error.response) {
            console.error('Error Body:', JSON.stringify(error.response.body, null, 2));
        } else {
            console.error('Error Message:', error.message);
        }
    });
