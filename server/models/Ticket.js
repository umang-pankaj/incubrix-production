import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data');
const TICKETS_FILE = path.join(DATA_DIR, 'tickets.json');

class TicketStore {
    constructor() {
        this.tickets = [];
        this._load();
    }

    async _load() {
        try {
            await fs.mkdir(DATA_DIR, { recursive: true });
            const data = await fs.readFile(TICKETS_FILE, 'utf8');
            this.tickets = JSON.parse(data);
        } catch (error) {
            this.tickets = [];
        }
    }

    async _save() {
        await fs.writeFile(TICKETS_FILE, JSON.stringify(this.tickets, null, 2));
    }

    async createTicket({ name, email, message, attachments }) {
        const ticketId = `TKT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const newTicket = {
            id: ticketId,
            name,
            email,
            message,
            status: 'Open',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Save basic info to disk
        this.tickets.push(newTicket);
        await this._save();

        // Include attachments in the memory object for the email service
        return { ...newTicket, attachments };
    }

    async getTicketById(id) {
        return this.tickets.find(t => t.id === id);
    }

    async updateTicketStatus(id, status) {
        const ticket = await this.getTicketById(id);
        if (ticket) {
            ticket.status = status;
            ticket.updatedAt = new Date().toISOString();
            await this._save();
            return ticket;
        }
        return null;
    }
}

export const ticketStore = new TicketStore();
