import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
    console.log('--- Google Calendar API Test ---');

    const keyPath = path.resolve('config', 'service-account.json');
    if (!fs.existsSync(keyPath)) {
        console.error('❌ service-account.json not found at:', keyPath);
        return;
    }

    const credentials = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    console.log('✅ Loaded credentials for:', credentials.client_email);

    const auth = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        ['https://www.googleapis.com/auth/calendar.readonly']
    );

    const calendar = google.calendar({ version: 'v3', auth });
    const adminEmail = process.env.ADMIN_CALENDAR_ID;
    console.log('🔍 Testing access to calendar:', adminEmail);

    try {
        const res = await calendar.calendarList.get({ calendarId: adminEmail });
        console.log('✅ Successfully accessed calendar metadata!');
        console.log('Title:', res.data.summary);

        const slots = await calendar.freebusy.query({
            requestBody: {
                timeMin: new Date().toISOString(),
                timeMax: new Date(Date.now() + 86400000).toISOString(),
                items: [{ id: adminEmail }]
            }
        });
        console.log('✅ Free/Busy query successful!');
    } catch (err) {
        console.error('❌ Connection Failed:', err.message);
        if (err.response && err.response.data) {
            console.error('Inner Error:', JSON.stringify(err.response.data.error, null, 2));
        }
        if (err.message.includes('unregistered callers')) {
            console.error('\n💡 TIP: This error usually means the "Google Calendar API" is not enabled in your Google Cloud Console.');
        }
    }
}

testConnection();
