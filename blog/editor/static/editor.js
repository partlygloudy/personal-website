let cm = null;           // CodeMirror instance
let currentSlug = null;  // Currently loaded post slug
let mode = 'edit';       // 'edit' or 'preview'
let dirty = false;       // Unsaved changes flag


document.addEventListener('DOMContentLoaded', () => {

    // Initialize CodeMirror
    cm = CodeMirror.fromTextArea(document.getElementById('markdown-editor'), {
        mode: 'markdown',
        lineWrapping: true,
        lineNumbers: false,
        tabSize: 4,
        indentWithTabs: false
    });

    cm.on('change', () => {
        dirty = true;
        updateButtons();
    });

    // Load post list, then load the most recent post
    loadPostList().then(() => {
        const firstPost = document.querySelector('#post-list li');
        if (firstPost) loadPost(firstPost.dataset.slug);
    });

    // Wire up toolbar buttons
    document.getElementById('btn-new-post').addEventListener('click', createNewPost);
    document.getElementById('btn-save').addEventListener('click', savePost);
    document.getElementById('btn-toggle-mode').addEventListener('click', toggleMode);
    document.getElementById('btn-commit-push').addEventListener('click', commitAndPush);
});


// ---- Post list ----

async function loadPostList() {
    const res = await fetch('/api/posts');
    const posts = await res.json();
    const list = document.getElementById('post-list');
    list.innerHTML = '';

    for (const post of posts) {
        const li = document.createElement('li');
        li.textContent = post.title;
        li.dataset.slug = post.url;
        li.addEventListener('click', () => loadPost(post.url));
        if (post.url === currentSlug) li.classList.add('active');
        list.appendChild(li);
    }
}


// ---- Load a post ----

async function loadPost(slug) {
    if (dirty && !confirm('You have unsaved changes. Discard them?')) return;

    const res = await fetch(`/api/posts/${slug}`);
    if (!res.ok) {
        showStatus('Failed to load post');
        return;
    }
    const data = await res.json();

    currentSlug = slug;
    cm.setValue(data.markdown);
    dirty = false;

    // Populate manifest fields
    document.getElementById('field-title').value = data.manifest.title || '';
    document.getElementById('field-card-desc').value = data.manifest.cardDescription || '';
    document.getElementById('field-card-img').value = data.manifest.cardImgUrl || '';

    // Switch to edit mode if in preview
    if (mode === 'preview') toggleMode();

    updateButtons();
    updateActivePost();
}


// ---- Toggle edit / preview ----

async function toggleMode() {
    const btn = document.getElementById('btn-toggle-mode');

    if (mode === 'edit') {
        // Switch to preview
        const res = await fetch('/api/preview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ markdown: cm.getValue(), slug: currentSlug })
        });
        const data = await res.json();
        document.getElementById('preview-pane').innerHTML = data.html;

        document.getElementById('editor-pane').classList.add('hidden');
        document.getElementById('manifest-fields').classList.add('hidden');
        document.getElementById('preview-pane').classList.remove('hidden');
        btn.textContent = 'EDIT';
        mode = 'preview';
    } else {
        // Switch to edit
        document.getElementById('preview-pane').classList.add('hidden');
        document.getElementById('editor-pane').classList.remove('hidden');
        document.getElementById('manifest-fields').classList.remove('hidden');
        btn.textContent = 'VIEW';
        mode = 'edit';
        cm.refresh(); // CodeMirror needs refresh after being hidden
    }
}


// ---- Save post ----

async function savePost() {
    if (!currentSlug) return;

    const manifestData = {
        title: document.getElementById('field-title').value,
        cardDescription: document.getElementById('field-card-desc').value,
        cardImgUrl: document.getElementById('field-card-img').value
    };

    const res = await fetch(`/api/posts/${currentSlug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            markdown: cm.getValue(),
            manifestData: manifestData
        })
    });

    if (res.ok) {
        dirty = false;
        updateButtons();
        showStatus('Saved');
        loadPostList(); // Refresh in case title changed
    } else {
        showStatus('Save failed');
    }
}


// ---- Create new post ----

async function createNewPost() {
    const title = prompt('Post title:');
    if (!title) return;

    const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });

    if (res.ok) {
        const data = await res.json();
        dirty = false;
        await loadPostList();
        loadPost(data.slug);
    } else {
        showStatus('Failed to create post');
    }
}


// ---- Commit and push ----

async function commitAndPush() {
    const message = prompt('Commit message:', 'Update blog post');
    if (!message) return;

    showStatus('Committing...');

    const res = await fetch('/api/git/commit-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });

    if (res.ok) {
        showStatus('Committed and pushed');
    } else {
        const err = await res.json();
        showStatus('Error: ' + (err.error || 'unknown'));
    }
}


// ---- Helpers ----

function updateButtons() {
    document.getElementById('btn-save').disabled = !dirty || !currentSlug;
    document.getElementById('btn-commit-push').disabled = !currentSlug;
}

function updateActivePost() {
    document.querySelectorAll('#post-list li').forEach(li => {
        li.classList.toggle('active', li.dataset.slug === currentSlug);
    });
}

function showStatus(msg) {
    const el = document.getElementById('status-message');
    el.textContent = msg;
    setTimeout(() => { el.textContent = ''; }, 3000);
}
