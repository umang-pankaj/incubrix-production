import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

async function test() {
    console.log('--- Direct OpenAI API Test ---');
    try {
        const response = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                input: 'Hello world',
                model: 'text-embedding-3-small'
            })
        });

        const data = await response.json();
        if (data.error) {
            console.error('API Error:', data.error);
        } else {
            console.log('API Success! Vector length:', data.data[0].embedding.length);
        }
    } catch (e) {
        console.error('Fetch Failed:', e);
    }
}

test();
