import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

class CalendarService {
    constructor() {
        this.auth = null;
        this.calendar = null;
    }

    async _init() {
        if (this.calendar) return;

        let credentials;
        try {
            // Prefer file-based loading for robustness
            const fs = await import('fs/promises');
            const path = await import('path');
            const { fileURLToPath } = await import('url');
            const __dirname = path.dirname(fileURLToPath(import.meta.url));
            const keyPath = path.resolve(__dirname, '../config/service-account.json');

            const keyContent = await fs.readFile(keyPath, 'utf8');
            credentials = JSON.parse(keyContent);
            console.log('✅ Loaded Google Service Account credentials from service-account.json');
        } catch (fileErr) {
            console.warn('⚠️ Could not load service-account.json:', fileErr.message);
            const keyData = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
            if (!keyData) {
                throw new Error('Google credentials missing (no service-account.json or GOOGLE_SERVICE_ACCOUNT_KEY ENV)');
            }
            try {
                credentials = JSON.parse(keyData);
            } catch (e) {
                credentials = JSON.parse(Buffer.from(keyData, 'base64').toString());
            }
        }

        this.auth = new google.auth.JWT(
            credentials.client_email,
            null,
            credentials.private_key,
            ['https://www.googleapis.com/auth/calendar']
        );

        this.calendar = google.calendar({ version: 'v3', auth: this.auth });
    }

    async getAvailableSlots(dateStr) {
        await this._init();
        const adminEmail = process.env.ADMIN_CALENDAR_ID;

        // Define working hours (e.g., 9 AM to 5 PM)
        const startOfDay = new Date(dateStr);
        startOfDay.setHours(9, 0, 0, 0);

        const endOfDay = new Date(dateStr);
        endOfDay.setHours(17, 0, 0, 0);

        const response = await this.calendar.freebusy.query({
            requestBody: {
                timeMin: startOfDay.toISOString(),
                timeMax: endOfDay.toISOString(),
                items: [{ id: adminEmail }]
            }
        });

        const busySlots = response.data.calendars[adminEmail].busy;

        // Generate 30-min slots
        const slots = [];
        let current = new Date(startOfDay);

        while (current < endOfDay) {
            const slotStart = new Date(current);
            const slotEnd = new Date(current.getTime() + 30 * 60000);

            const isBusy = busySlots.some(busy => {
                const bStart = new Date(busy.start);
                const bEnd = new Date(busy.end);
                return (slotStart < bEnd && slotEnd > bStart);
            });

            if (!isBusy && slotStart > new Date()) {
                slots.push({
                    start: slotStart.toISOString(),
                    end: slotEnd.toISOString()
                });
            }

            current = slotEnd;
        }

        return slots;
    }

    async createBooking({ name, email, purpose, startTime, endTime }) {
        await this._init();
        const adminEmail = process.env.ADMIN_CALENDAR_ID;

        const event = {
            summary: `Demo: ${name} (${purpose})`,
            description: `Meeting with ${name} regarding ${purpose}. Contact: ${email}`,
            start: { dateTime: startTime },
            end: { dateTime: endTime },
            attendees: [
                { email: adminEmail },
                { email: email }
            ],
            conferenceData: {
                createRequest: {
                    requestId: `booking-${Date.now()}`,
                    conferenceSolutionKey: { type: 'hangoutsMeet' }
                }
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'popup', minutes: 10 }
                ]
            }
        };

        const response = await this.calendar.events.insert({
            calendarId: adminEmail,
            resource: event,
            conferenceDataVersion: 1,
            sendUpdates: 'all'
        });

        return response.data;
    }
}

export const calendarService = new CalendarService();
