import dotenv from 'dotenv';
import { OpenAIEmbeddings } from '@langchain/openai';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

async function test() {
    console.log('--- STANDALONE FAQ Ingestion Test ---');
    try {
        const faqDbData = await fs.readFile(path.join(process.cwd(), 'data', 'faq_db.json'), 'utf-8');
        const faqData = JSON.parse(faqDbData);
        console.log(`Loaded ${faqData.length} FAQs.`);

        const embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: 'text-embedding-3-small',
            dimensions: 1536
        });

        const docs = faqData.map(f => {
            const keywordText = f.keywords && Array.isArray(f.keywords) ? f.keywords.join(' ') : '';
            return {
                pageContent: `${f.question} ${keywordText}`,
                metadata: {
                    source: 'faq',
                    id: f.id,
                    answer: f.answer,
                    original_question: f.question
                }
            };
        });

        console.log(`Starting embedding for ${docs.length} docs...`);
        const vectors = await embeddings.embedDocuments(docs.map(d => d.pageContent));
        console.log(`Generated ${vectors.length} vectors.`);

        docs.forEach((doc, idx) => {
            doc.embedding = vectors[idx];
        });

        const filePath = path.join(process.cwd(), 'faq_index.json');
        await fs.writeFile(filePath, JSON.stringify(docs, null, 2));
        console.log(`Saved index to ${filePath}`);
        console.log('SUCCESS!');
    } catch (e) {
        console.error('FAILED:', e);
    }
}

test();
