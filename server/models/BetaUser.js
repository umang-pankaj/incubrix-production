import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data');
const BETA_USERS_FILE = path.join(DATA_DIR, 'beta_users.json');

class BetaUserStore {
    constructor() {
        this.users = [];
        this._loaded = this._load();
    }

    async _load() {
        try {
            await fs.mkdir(DATA_DIR, { recursive: true });
            const data = await fs.readFile(BETA_USERS_FILE, 'utf8');
            this.users = JSON.parse(data);
        } catch {
            this.users = [];
        }
    }

    async _save() {
        await fs.writeFile(BETA_USERS_FILE, JSON.stringify(this.users, null, 2));
    }

    async _ensureLoaded() {
        await this._loaded;
    }

    async emailExists(email) {
        await this._ensureLoaded();
        return this.users.some(u => u.email.toLowerCase() === email.toLowerCase());
    }

    async createUser({ name, channelName, email, channelLinks, contactNumber, creatorType, primaryPlatform, linkedinUrl }) {
        await this._ensureLoaded();

        if (await this.emailExists(email)) {
            throw new Error('DUPLICATE_EMAIL');
        }

        const nextId = this.users.length > 0
            ? Math.max(...this.users.map(u => u.id)) + 1
            : 1;

        const newUser = {
            id: nextId,
            name: name.trim(),
            channelName: channelName?.trim() || null,
            email: email.trim().toLowerCase(),
            channelLinks: channelLinks || null,
            contactNumber: contactNumber?.trim() || null,
            creatorType: creatorType || null,
            primaryPlatform: primaryPlatform || null,
            linkedinUrl: linkedinUrl?.trim() || null,
            status: 'Pending',
            createdAt: new Date().toISOString(),
        };

        this.users.push(newUser);
        await this._save();
        return newUser;
    }

    async getAll() {
        await this._ensureLoaded();
        return this.users;
    }

    async updateStatus(id, status) {
        await this._ensureLoaded();
        const user = this.users.find(u => u.id === id);
        if (!user) return null;
        user.status = status;
        await this._save();
        return user;
    }
}

export const betaUserStore = new BetaUserStore();
