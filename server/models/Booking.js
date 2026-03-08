import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

class BookingStore {
    constructor() {
        this.bookings = [];
        this._load();
    }

    async _load() {
        try {
            await fs.mkdir(DATA_DIR, { recursive: true });
            const data = await fs.readFile(BOOKINGS_FILE, 'utf8');
            this.bookings = JSON.parse(data);
        } catch (error) {
            this.bookings = [];
        }
    }

    async _save() {
        await fs.writeFile(BOOKINGS_FILE, JSON.stringify(this.bookings, null, 2));
    }

    async addBooking(bookingData) {
        const newBooking = {
            id: `book_${Date.now()}`,
            ...bookingData,
            createdAt: new Date().toISOString()
        };
        this.bookings.push(newBooking);
        await this._save();
        return newBooking;
    }

    async getAllBookings() {
        return this.bookings;
    }

    async checkDuplicate(email, startTime) {
        return this.bookings.some(b => b.email === email && b.startTime === startTime);
    }
}

export const bookingStore = new BookingStore();
