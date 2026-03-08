import fs from 'fs';
import path from 'path';

try {
    const keyPath = path.resolve('server/config/service-account.json');
    const content = fs.readFileSync(keyPath, 'utf8');
    const json = JSON.parse(content);
    console.log('✅ JSON is valid');
    console.log('Project ID:', json.project_id);
    console.log('Client Email:', json.client_email);
    console.log('Private Key starts with:', json.private_key.substring(0, 30));
    console.log('Private Key contains newlines:', json.private_key.includes('\n'));
} catch (e) {
    console.error('❌ Error:', e.message);
}
