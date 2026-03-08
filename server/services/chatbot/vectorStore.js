import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';

// Define file paths for persistence
const CONTENT_INDEX_FILE = path.join(process.cwd(), 'data', 'chatbot_index.json');
const FAQ_INDEX_FILE = path.join(process.cwd(), 'data', 'faq_index.json');

/**
 * Simple Naive Vector Store (In-Memory)
 */
class SimpleVectorStore {
    constructor() {
        this.docs = []; // { pageContent, metadata, embedding }
    }

    addDocuments(documents) {
        this.docs.push(...documents);
    }

    clear() {
        this.docs = [];
    }

    async similaritySearchVectorWithScore(queryVector, k = 4) {
        if (!queryVector || !this.docs.length) return [];
        const results = this.docs.map(doc => ({
            doc,
            score: this.cosineSimilarity(queryVector, doc.embedding)
        }));

        results.sort((a, b) => b.score - a.score);
        return results.slice(0, k).map(r => ({ ...r.doc, score: r.score }));
    }

    cosineSimilarity(vecA, vecB) {
        if (!vecA || !vecB) return 0;
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }
}

/**
 * Vector Store Service (Simplified fetch version)
 */
class VectorStoreService {
    constructor() {
        this.contentStore = new SimpleVectorStore();
        this.faqStore = new SimpleVectorStore();
        this.quotaExceeded = false; // Stop embedding attempts if quota is exceeded
    }

    async init() {
        await this.loadStore(this.contentStore, CONTENT_INDEX_FILE, 'Content');
        await this.loadStore(this.faqStore, FAQ_INDEX_FILE, 'FAQ');
        return true;
    }

    async loadStore(store, filePath, name) {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            const docs = JSON.parse(data);
            if (docs && Array.isArray(docs) && docs.length > 0 && docs[0].embedding) {
                store.clear();
                store.addDocuments(docs);
                console.log(`[VectorStore] ${name} Index loaded with ${docs.length} vectors.`);
            }
        } catch (error) {
            console.log(`[VectorStore] No existing ${name} index found.`);
        }
    }

    async saveStore(store, filePath, name) {
        try {
            await fs.writeFile(filePath, JSON.stringify(store.docs, null, 2));
            console.log(`[VectorStore] ${name} Index saved.`);
        } catch (e) {
            console.error(`[VectorStore] Failed to save ${name} index:`, e);
        }
    }

    async getEmbedding(text) {
        if (!process.env.OPENAI_API_KEY) return null;
        if (this.quotaExceeded) return null; // Skip if quota was already exceeded
        try {
            const response = await fetch('https://api.openai.com/v1/embeddings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    input: text,
                    model: 'text-embedding-3-small'
                })
            });
            const data = await response.json();
            if (data.error) {
                if (data.error.code === 'insufficient_quota' || data.error.type === 'insufficient_quota') {
                    console.warn('[VectorStore] OpenAI quota exceeded. Disabling embeddings for this session.');
                    this.quotaExceeded = true;
                } else {
                    console.error('[VectorStore] Embedding API Error:', data.error.message);
                }
                return null;
            }
            return data.data[0].embedding;
        } catch (e) {
            console.error('[VectorStore] Embedding Fetch Error:', e);
            return null;
        }
    }

    async ingestFAQs(faqData) {
        console.log(`[VectorStore] Ingesting ${faqData.length} FAQs...`);
        const docs = [];
        for (const f of faqData) {
            const keywordText = f.keywords && Array.isArray(f.keywords) ? f.keywords.join(' ') : '';
            const content = `${f.question} ${keywordText}`;
            const embedding = await this.getEmbedding(content);
            if (embedding) {
                docs.push({
                    pageContent: content,
                    embedding,
                    metadata: {
                        source: 'faq',
                        id: f.id,
                        answer: f.answer,
                        original_question: f.question
                    }
                });
            }
        }
        if (docs.length > 0) {
            this.faqStore.clear();
            this.faqStore.addDocuments(docs);
            await this.saveStore(this.faqStore, FAQ_INDEX_FILE, 'FAQ');
        }
    }

    async searchFAQ(query) {
        const vector = await this.getEmbedding(query);
        if (!vector) return [];
        return this.faqStore.similaritySearchVectorWithScore(vector, 1);
    }

    async searchContent(query, k = 4) {
        const vector = await this.getEmbedding(query);
        if (!vector) return [];
        return this.contentStore.similaritySearchVectorWithScore(vector, k);
    }
}

export default new VectorStoreService();
