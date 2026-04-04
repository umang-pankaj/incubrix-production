import vectorStore from './vectorStore.js';
import WebScraper from './scraper.js';
import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';

class ChatService {
    constructor() {
        this.scraper = new WebScraper(process.env.FRONTEND_URL || 'http://localhost:5174');
        this.presets = [];
        this.faqData = [];
    }

    async initialize() {
        console.log('[ChatService] Initializing...');
        try {
            const presetsData = await fs.readFile(path.join(process.cwd(), 'data', 'faq_presets.json'), 'utf-8');
            this.presets = JSON.parse(presetsData);

            const faqDbData = await fs.readFile(path.join(process.cwd(), 'data', 'faq_db.json'), 'utf-8');
            this.faqData = JSON.parse(faqDbData);
            console.log(`[ChatService] Loaded ${this.presets.length} presets and ${this.faqData.length} FAQs.`);
        } catch (e) {
            console.error('[ChatService] Load error:', e);
        }

        this.runBackgroundTask(async () => {
            try {
                await vectorStore.init();
                if (vectorStore.faqStore.docs.length === 0 && this.faqData.length > 0) {
                    await vectorStore.ingestFAQs(this.faqData);
                }
            } catch (error) {
                console.error('[ChatService] Init background error:', error);
            }
        });
        console.log('[ChatService] Ready.');
    }

    runBackgroundTask(task) {
        task().catch(err => console.error('[ChatService] Background Error:', err));
    }

    async processMessage(message, sessionId) {
        if (this.isEscalation(message)) return this.getEscalationResponse();

        const presetMatch = this.presets.find(p => p.id === message || p.label.toLowerCase() === message.toLowerCase());
        if (presetMatch) return { source: 'preset', answer: presetMatch.answer };

        const keywordMatch = this.findFAQByKeyword(message);
        if (keywordMatch) return { source: 'faq_keyword', answer: keywordMatch.answer };

        try {
            const faqResults = await vectorStore.searchFAQ(message);
            if (faqResults.length > 0 && faqResults[0].score > 0.82) {
                return { source: 'faq', answer: faqResults[0].metadata.answer };
            }
        } catch (e) { }

        return await this.generateAIResponse(message);
    }

    isEscalation(message) {
        const lower = message.toLowerCase();
        return lower.includes('talk to human') || lower.includes('support') || lower.includes('contact agent');
    }

    findFAQByKeyword(message) {
        const lower = message.toLowerCase();
        for (const faq of this.faqData) {
            if (lower.includes(faq.question.toLowerCase())) return faq;
            if (faq.keywords?.some(kw => lower.includes(kw.toLowerCase()))) return faq;
        }
        return null;
    }

    getEscalationResponse() {
        return { source: 'system', answer: "Contact us at **support@incubrix.com**." };
    }

    async generateAIResponse(message) {
        if (!process.env.GEMINI_API_KEY) return { source: 'error', answer: "Offline." };

        try {
            const relevantDocs = await vectorStore.searchContent(message, 3);
            const context = relevantDocs.map(d => d.pageContent).join('\n\n');

            if (!context || relevantDocs.length === 0) {
                return {
                    source: 'ai',
                    answer: "I'm not sure about that specifically. Would you like me to help you contact our support team?",
                    action: 'offer_contact'
                };
            }

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        { role: 'user', parts: [{ text: `Context: ${context}\n\nQuestion: ${message}` }] }
                    ],
                    systemInstruction: {
                        parts: [{ text: "You are IncuBrix AI, a helpful assistant for the IncuBrix platform.\nUse the following context to answer the user's question.\nIf the answer is not in the context, be honest and say you don't know, then ask if they want to contact support." }]
                    },
                    generationConfig: {
                        temperature: 0.3
                    }
                })
            });

            const data = await response.json();
            if (data.error) {
                if (data.error.code === 429) { // Quota exceeded in Gemini usually returns 429
                    return { source: 'error', answer: "I'm currently on a break due to high usage. Please try again later or contact **support@incubrix.com** for immediate help." };
                }
                return { source: 'error', answer: `AI Error: ${data.error.message}` };
            }

            const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "I encountered an issue generating a response.";

            // If AI admits it doesn't know, offer contact
            if (answer.toLowerCase().includes("don't know") || answer.toLowerCase().includes("do not know") || answer.toLowerCase().includes("no information")) {
                return {
                    source: 'ai',
                    answer: answer.includes("?") ? answer : answer + " Would you like to contact support?",
                    action: 'offer_contact'
                };
            }

            return { source: 'ai', answer: answer };
        } catch (e) {
            return { source: 'error', answer: "I encountered an error processing your request." };
        }
    }
}

export default new ChatService();
