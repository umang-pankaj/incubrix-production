import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 10000 });
        
        // Wait a little extra
        await new Promise(r => setTimeout(r, 2000));
        
        const html = await page.content();
        fs.writeFileSync('debug-result.html', html);
        
        await browser.close();
        console.log('HTML captured to debug-result.html');
    } catch (e) {
        console.error('Script failed:', e);
        process.exit(1);
    }
})();
