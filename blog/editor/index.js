const express = require('express');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { createConverter, applyLinks } = require('../shared/rendering');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

const converter = createConverter();

const BLOG_ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(BLOG_ROOT, 'posts');
const MANIFEST_PATH = path.join(BLOG_ROOT, 'static', 'json', 'manifest.json');
const REPO_ROOT = path.resolve(BLOG_ROOT, '..');


// Serve editor's own static files
app.use('/editor-static', express.static(path.join(__dirname, 'static')));

// Serve blog's static files (so blog CSS + image paths work in preview)
app.use('/static', express.static(path.join(BLOG_ROOT, 'static')));


// ------------------- //
// ----- PAGES ------- //
// ------------------- //


app.get('/', (req, res) => {
    res.render('editor');
});


// ------------------- //
// ----- API --------- //
// ------------------- //


// List all posts
app.get('/api/posts', (req, res) => {
    const manifest = loadManifest();
    res.json(manifest);
});


// Get a single post
app.get('/api/posts/:slug', (req, res) => {
    const slug = req.params.slug;
    const filePath = path.join(POSTS_DIR, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Post not found' });
    }

    const markdown = fs.readFileSync(filePath, 'utf8');
    const manifest = loadManifest();
    const entry = manifest.find(m => m.url === slug);

    res.json({ markdown, manifest: entry || {} });
});


// Create a new post
app.post('/api/posts', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    // Find next number
    const files = fs.readdirSync(POSTS_DIR);
    const numbers = files
        .map(f => parseInt(f.split('-')[0], 10))
        .filter(n => !isNaN(n));
    const nextNum = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;

    // Generate slug
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const fullSlug = `${nextNum}-${slug}`;

    // Create initial markdown with date
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit'
    });
    const markdown = `# ${title}\n#### ${dateStr} at ${timeStr}\n\n`;

    fs.writeFileSync(path.join(POSTS_DIR, `${fullSlug}.md`), markdown);

    // Add to manifest
    const manifest = loadManifest();
    manifest.push({
        url: fullSlug,
        title: title,
        date: now.toISOString(),
        cardImgUrl: 'card-gravity-waves.png',
        cardDescription: ''
    });
    saveManifest(manifest);

    res.json({ slug: fullSlug, markdown });
});


// Save an existing post
app.post('/api/posts/:slug', (req, res) => {
    const slug = req.params.slug;
    const { markdown, manifestData } = req.body;

    // Write markdown file
    fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), markdown);

    // Update manifest entry
    if (manifestData) {
        const manifest = loadManifest();
        const idx = manifest.findIndex(m => m.url === slug);
        if (idx !== -1) {
            Object.assign(manifest[idx], manifestData);
            saveManifest(manifest);
        }
    }

    res.json({ success: true });
});


// Render preview
app.post('/api/preview', (req, res) => {
    const { markdown } = req.body;
    let html = converter.makeHtml(markdown);
    html = applyLinks(html, '', '');
    html = `<div class="post post-final">${html}</div>`;
    res.json({ html });
});


// Commit and push
app.post('/api/git/commit-push', (req, res) => {
    try {
        execSync('git add blog/posts/ blog/static/json/manifest.json', {
            cwd: REPO_ROOT
        });

        const message = (req.body.message || 'Update blog post').replace(/"/g, '\\"');
        execSync(`git commit -m "${message}"`, { cwd: REPO_ROOT });
        execSync('git push', { cwd: REPO_ROOT });

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.stderr?.toString() || err.message });
    }
});


// ----------------------- //
// ----- HELPERS --------- //
// ----------------------- //


function loadManifest() {
    const raw = fs.readFileSync(MANIFEST_PATH, 'utf8');
    const manifest = JSON.parse(raw);
    manifest.sort((a, b) => new Date(b.date) - new Date(a.date));
    return manifest;
}


function saveManifest(manifest) {
    manifest.sort((a, b) => new Date(b.date) - new Date(a.date));
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
}


// ----------------------- //
// ----- START ----------- //
// ----------------------- //


const port = 8081;
app.listen(port, '127.0.0.1', () => {
    console.log(`Blog editor running at http://localhost:${port}`);
});
