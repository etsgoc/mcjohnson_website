const LEARN_DOCS = [
    { number: "00", file: "00_START_HERE.md", title: "Start Here" },
    { number: "01", file: "01_stage1_machine_foundations.md", title: "Stage 1 — Machine Foundations" },
    { number: "02", file: "02_stage2_c_programming.md", title: "Stage 2 — C Programming" },
    { number: "03", file: "03_stage3_assembly_and_os_concepts.md", title: "Stage 3 — Assembly and OS Concepts" },
    { number: "04", file: "04_stage4_build_first_language.md", title: "Stage 4 — Build Your First Language" },
    { number: "05", file: "05_stage5_rust_like_features.md", title: "Stage 5 — Make It Rust-Like" },
    { number: "06", file: "06_stage6_memory_model_ownership.md", title: "Stage 6 — Memory Model & Ownership" },
    { number: "07", file: "07_stage7_standard_library.md", title: "Stage 7 — Standard Library" },
    { number: "08", file: "08_stage8_tiny_kernel_os.md", title: "Stage 8 — Tiny Kernel / Operating System" },
    { number: "09", file: "09_stage9_networking_distributed_systems.md", title: "Stage 9 — Networking, Concurrency & Distributed Systems" },
    { number: "10", file: "10_stage10_blockchain.md", title: "Stage 10 — Blockchain" },
    { number: "11", file: "11_stage11_frontend_framework.md", title: "Stage 11 — A Frontend Framework for Jeko" },
    { number: "12", file: "12_resources_and_next_steps.md", title: "Resources — Go Deeper, Forever" }
];

function getDocByNumber(number) {
    return LEARN_DOCS.find(doc => doc.number === number);
}

function escapeHtml(value) {
    return value.replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }[char]));
}

function currentDocNumber() {
    const page = document.body.dataset.doc;
    return page ? page.padStart(2, '0') : null;
}

function renderDocNav() {
    const list = document.getElementById('learnDocList');
    const rail = document.getElementById('learnNumberRail');

    if (!list || !rail) return;

    list.innerHTML = LEARN_DOCS.map(doc => `
        <a class="learn-doc-link${doc.number === currentDocNumber() ? ' is-active' : ''}"
           href="doc-${doc.number}.html"
           title="${escapeHtml(doc.title)}">
            <span class="learn-doc-number">${doc.number}</span>
            <span class="learn-doc-title">${escapeHtml(doc.title)}</span>
        </a>
    `).join('');

    rail.innerHTML = LEARN_DOCS.map(doc => `
        <a class="learn-rail-number${doc.number === currentDocNumber() ? ' is-active' : ''}"
           href="doc-${doc.number}.html"
           aria-label="Open document ${doc.number}: ${escapeHtml(doc.title)}"
           title="${escapeHtml(doc.title)}">${doc.number}</a>
    `).join('');
}

function setupSidebar() {
    const shell = document.querySelector('.learn-shell');
    const button = document.getElementById('learnMenuButton');
    const sidebar = document.getElementById('learnSidebar');
    const overlay = document.getElementById('learnOverlay');

    if (!shell || !button || !sidebar || !overlay) return;

    const setOpen = open => {
        shell.classList.toggle('sidebar-open', open);
        button.setAttribute('aria-expanded', open ? 'true' : 'false');
        overlay.hidden = !open;
    };

    button.addEventListener('click', () => {
        setOpen(!shell.classList.contains('sidebar-open'));
    });

    overlay.addEventListener('click', () => setOpen(false));

    sidebar.addEventListener('click', event => {
        if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') setOpen(false);
    });
}

async function renderMarkdownPage() {
    const content = document.getElementById('learnMarkdown');
    const number = currentDocNumber();

    if (!content || !number) return;

    const doc = getDocByNumber(number);
    if (!doc) {
        content.innerHTML = '<p class="learn-error">Document not found.</p>';
        return;
    }

    document.title = `${doc.title} — Jeko Learning`;
    const label = document.getElementById('learnCurrentLabel');
    if (label) label.textContent = `${doc.number} · ${doc.title}`;

    try {
        const response = await fetch(`../../assets/systems/jeko-learning/${doc.file}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const markdown = await response.text();
        content.innerHTML = marked.parse(markdown, {
            gfm: true,
            breaks: false
        });

        content.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && /^https?:\/\//i.test(href)) {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
        });

        content.querySelectorAll('pre code').forEach(block => {
            block.classList.add('learn-code');
        });
    } catch (error) {
        console.error('Could not load learning document:', error);
        content.innerHTML = `
            <div class="learn-error">
                <h2>Unable to load this document</h2>
                <p>Check that the Markdown file exists in <code>assets/systems/jeko-learning/</code>.</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderDocNav();
    setupSidebar();
    renderMarkdownPage();
});
