import fs from 'fs/promises';
import path from 'path';
import * as cheerio from 'cheerio'; // Still useful for parsing JSX if we treat it as XML, or justregex

/**
 * File System Scraper Service
 * Scans local source files to build knowledge base.
 */
class WebScraper {
    constructor(baseUrl) {
        this.baseUrl = baseUrl; // Unused but kept for interface compatibility
        this.rootDir = path.join(process.cwd(), '../src'); // Assuming we are in server/
    }

    async walkDir(dir) {
        let results = [];
        const list = await fs.readdir(dir);
        for (const file of list) {
            const filePath = path.join(dir, file);
            const stat = await fs.stat(filePath);
            if (stat && stat.isDirectory()) {
                results = results.concat(await this.walkDir(filePath));
            } else {
                if (file.endsWith('.jsx') || file.endsWith('.tsx') || file.endsWith('.md')) {
                    results.push(filePath);
                }
            }
        }
        return results;
    }

    async scrapePage(filePath) {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const relativePath = path.relative(this.rootDir, filePath);
            const url = `${this.baseUrl}/${relativePath.replace(/\\/g, '/').replace(/\.jsx?$/, '')}`;

            // Simple extraction: Remove imports and exports, keep JSX text and strings
            // This is a naive heuristic but works for RAG context
            let cleanContent = content
                .replace(/import .* from .*/g, '')
                .replace(/export default function/g, '')
                .replace(/const .* = .*/g, '')
                .replace(/console\.log\(.*\)/g, '')
                .replace(/className="[^"]*"/g, ''); // Remove classes to reduce noise

            // Remove empty lines
            cleanContent = cleanContent.replace(/^\s*[\r\n]/gm, '');

            if (cleanContent.length < 50) return null;

            return {
                url: url,
                title: path.basename(filePath),
                content: cleanContent.substring(0, 8000) // Limit size per file
            };

        } catch (error) {
            console.error(`[Scraper] Error processing ${filePath}:`, error);
            return null;
        }
    }

    /**
     * Crawl the local file system
     * @returns {Array} List of pages
     */
    async crawl() {
        console.log(`[Scraper] Scanning local files in ${this.rootDir}...`);
        try {
            const files = await this.walkDir(this.rootDir);
            const pages = [];

            for (const file of files) {
                const data = await this.scrapePage(file);
                if (data) {
                    pages.push(data);
                }
            }

            console.log(`[Scraper] Scan finished. Indexed ${pages.length} files.`);
            return pages;
        } catch (e) {
            console.error('[Scraper] Failed to scan local files:', e);
            return [];
        }
    }
}

export default WebScraper;
