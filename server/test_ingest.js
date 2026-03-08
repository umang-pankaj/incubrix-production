import dotenv from 'dotenv';
import vectorStore from './services/chatbot/vectorStore.js';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

async function test() {
    console.log('--- FAQ Ingestion Test ---');
    try {
        const faqDbData = await fs.readFile(path.join(process.cwd(), 'data', 'faq_db.json'), 'utf-8');
        const faqData = JSON.parse(faqDbData);
        console.log(`Loaded ${faqData.length} FAQs.`);

        await vectorStore.ingestFAQs(faqData);
        console.log('Ingestion Successful!');
    } catch (e) {
        console.error('Ingestion Failed:', e);
    }
}

test();
