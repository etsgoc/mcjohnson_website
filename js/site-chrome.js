// js/site-chrome.js
// Builds the top pill nav and bottom dock footer on every page from a single
// source of truth (SECTIONS below). Each page only needs:
//   1. <script>const SITE_ROOT = '...';</script>  (relative path back to site root)
//   2. <body data-page="home|about|contact|apps|blog|projects|capabilities|legal">
//   3. <div id="chrome-header"></div> ... <div id="chrome-footer"></div>
//   4. js/icons.js loaded before this file
//
// To add/rename/reorder a section site-wide, edit SECTIONS once — every
// page's nav + footer + home tiles update automatically.

const SECTIONS = [
    { id: 'about',        label: 'Me',           href: 'pages/about.html',            icon: 'user', tile: 'about.png',        blurb: 'About Edward & this site' },
    { id: 'contact',      label: 'Contact',      href: 'pages/contact.html',          icon: 'mail', tile: 'contact.png',      blurb: 'Get in touch' },
    { id: 'apps',         label: 'Apps',         href: 'pages/mcjohnson-apps.html',   icon: 'apple', tile: 'apps.png',        blurb: 'iOS apps on the App Store' },
    { id: 'blog',         label: 'Blog',         href: 'pages/blog.html',             icon: 'edit', tile: 'blog.png',         blurb: 'Writing & notes' },
    { id: 'projects',     label: 'Projects',     href: 'pages/projects.html',         icon: 'link', tile: 'projects.png',     blurb: 'Blockchain & other builds' },
    { id: 'capabilities', label: 'Capabilities', href: 'pages/capabilities.html',     icon: 'tool', tile: 'capabilities.png', blurb: 'Skills & useful resources' },
];

const SOCIALS = [
    { id: 'x',         label: 'X / Twitter', href: 'https://x.com/prince_edwardt',        icon: 'x' },
    { id: 'instagram', label: 'Instagram',    href: 'https://instagram.com/prince.edwardt', icon: 'instagram' },
    { id: 'telegram',  label: 'Telegram',     href: 'https://t.me/princeedwardt',           icon: 'telegramAlt' },
    { id: 'github',    label: 'GitHub',       href: 'https://github.com/etsgoc',            icon: 'github' },
];

const LEGAL_LINKS = [
    { label: 'Privacy Policy', href: 'pages/legal/privacy.html' },
    { label: 'Terms of Service', href: 'pages/legal/terms.html' },
    { label: 'Refund Policy', href: 'pages/legal/refund.html' },
    { label: 'Cookie Policy', href: 'pages/legal/cookies.html' },
];

const APP_LEGAL_LINKS = [
    { label: 'Pefi — Privacy', href: 'pages/legal/pefi/privacy.html' },
    { label: 'Pefi — Terms', href: 'pages/legal/pefi/terms.html' },
    { label: 'Yearbook — Privacy', href: 'pages/legal/yearbook/privacy.html' },
    { label: 'Yearbook — Terms', href: 'pages/legal/yearbook/terms.html' },
    { label: 'WanderKit — Privacy', href: 'pages/legal/wanderkit/privacy.html' },
    { label: 'WanderKit — Terms', href: 'pages/legal/wanderkit/terms.html' },
];

(function () {
    const ROOT = (typeof SITE_ROOT !== 'undefined') ? SITE_ROOT : '';
    const page = document.body.dataset.page || '';
    const isHome = page === 'home';

    function url(relFromRoot) { return ROOT + relFromRoot; }

    // ── TOP PILL NAV ────────────────────────────────────────
    function renderHeader() {
        const mount = document.getElementById('chrome-header');
        if (!mount) return;

        const brandInner = isHome
            ? `Edward Sithole`
            : `<span class="pill-nav-back">${icon('back', { size: 17 })}</span><span class="pill-nav-brand-name">Edward Sithole</span>`;

        let rightHtml;
        if (isHome) {
            rightHtml = `<div class="pill-nav-socials">` + SOCIALS.map(s =>
                `<a class="pill-nav-icon-btn" href="${s.href}" target="_blank" rel="noopener" data-label="${s.label}" aria-label="${s.label}">${icon(s.icon, { size: 18 })}</a>`
            ).join('') + `</div>`;
        } else {
            rightHtml = `<div class="pill-nav-socials">` + SECTIONS.map(s =>
                `<a class="pill-nav-icon-btn${s.id === page ? ' is-active' : ''}" href="${url(s.href)}" data-label="${s.label}" aria-label="${s.label}">${icon(s.icon, { size: 17 })}</a>`
            ).join('') + `</div>`;
        }

        mount.innerHTML = `
            <div class="pill-nav-wrap">
                <nav class="pill-nav">
                    <a class="pill-nav-brand" href="${url('index.html')}" aria-label="Back to home">${brandInner}</a>
                    ${rightHtml}
                </nav>
            </div>
        `;
    }

    // ── FOOTER DOCK ─────────────────────────────────────────
    function renderFooter() {
        const mount = document.getElementById('chrome-footer');
        if (!mount) return;

        const year = new Date().getFullYear();

        const quickLinksHtml = [{ label: 'Home', href: 'index.html' }, ...SECTIONS.map(s => ({ label: s.label, href: s.href }))]
            .map(l => `<li><a href="${url(l.href)}">${l.label}</a></li>`).join('');

        const legalHtml = LEGAL_LINKS.map(l => `<li><a href="${url(l.href)}">${l.label}</a></li>`).join('');
        const appLegalHtml = APP_LEGAL_LINKS.map(l => `<li><a href="${url(l.href)}">${l.label}</a></li>`).join('');
        const socialsHtml = SOCIALS.map(s => `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}">${icon(s.icon, { size: 16 })}</a>`).join('');

        mount.innerHTML = `
            <div class="dock" id="footerDock">
                <button class="dock-bar" id="dockBarBtn" aria-expanded="false">
                    <div class="dock-bar-links">
                        <a href="${url('pages/legal/privacy.html')}" onclick="event.stopPropagation()">Privacy</a>
                        <span class="dot">·</span>
                        <a href="${url('pages/legal/terms.html')}" onclick="event.stopPropagation()">Terms</a>
                        <span class="dot">·</span>
                        <span class="dock-bar-copy">© ${year} Edward Sithole</span>
                    </div>
                    <span class="dock-more-btn">More ${icon('chevronDown', { size: 14 })}</span>
                </button>
                <div class="dock-panel">
                    <div class="dock-panel-inner">
                        <div class="dock-col">
                            <h4>Explore</h4>
                            <ul>${quickLinksHtml}</ul>
                        </div>
                        <div class="dock-col">
                            <h4>Legal</h4>
                            <ul>${legalHtml}</ul>
                        </div>
                        <div class="dock-col">
                            <h4>App Legal</h4>
                            <ul>${appLegalHtml}</ul>
                        </div>
                        <div class="dock-col">
                            <h4>Elsewhere</h4>
                            <div class="dock-social-row">${socialsHtml}</div>
                            <a href="${url('pages/learn')}" style="text-decoration:none;color:inherit;">
                                <p style="margin-top:12px;font-size:0.72rem;color:var(--gray-400);">
                                    © ${year} Edward Tinotenda Sithole · McJohnson Apps
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const dock = document.getElementById('footerDock');
        const btn = document.getElementById('dockBarBtn');
        btn.addEventListener('click', () => {
            const open = dock.classList.toggle('is-open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            btn.querySelector('.dock-more-btn').innerHTML = (open ? 'Less ' : 'More ') + icon('chevronDown', { size: 14 });
        });
    }

    // ── HOME LAUNCHER GRID ──────────────────────────────────
    function renderLauncherGrid() {
        const mount = document.getElementById('appGrid');
        if (!mount) return;
        mount.innerHTML = SECTIONS.map(s => `
            <a class="app-tile" href="${url(s.href)}">
                <span class="app-tile-icon">
                    <img src="${url('assets/img/icons/' + s.tile)}" alt="${s.label}"
                         onerror="this.remove()">
                    <span class="app-tile-fallback">${icon(s.icon, { size: 34 })}</span>
                </span>
                <span class="app-tile-label">${s.label}</span>
            </a>
        `).join('');
    }

    document.addEventListener('DOMContentLoaded', function () {
        renderHeader();
        renderFooter();
        if (isHome) renderLauncherGrid();
    });
})();
