// js/app.js

function initAll() {
    initAdBoosts();
    initAffiliateGrid();
    initRandomAd();
    initScrollPartners();
    initHeroMockups();
    initFeaturedApps();
    trackAdImpressions();
    initHeroBlogCard();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

// ─── AD BOOSTS ────
function initAdBoosts() {
    const slider = document.getElementById('adBoostSlider');
    if (!slider) return;

    adBoostsFull.forEach(ad => {
        const card = document.createElement('div');
        card.className = 'ad-boost-card';
        card.dataset.adId = ad.id;

        const logoHtml = ad.logo
            ? `<img src="${ad.logo}" alt="${ad.company} logo" style="height:28px;object-fit:contain;margin-bottom:4px;">`
            : '';

        card.innerHTML = `
            ${logoHtml}
            <strong style="font-size:0.95rem;display:block;margin-bottom:2px;color:rgba(255,255,255,0.9);">${ad.company}</strong>
            <p style="margin:0;font-size:0.8rem;color:rgba(255,255,255,0.5);">${ad.description || ''}</p>
        `;
        card.onclick = () => {
            trackAdClick(ad.id);
            if (ad.link.startsWith('http')) {
                window.open(ad.link, '_blank');
            } else {
                window.location.href = ad.link;
            }
        };
        slider.appendChild(card);
    });
}

// ─── AFFILIATE GRID (homepage preview — 4 cards) ─────
function initAffiliateGrid() {
    const grid = document.getElementById('affiliateGrid');
    if (!grid) return;

    affiliateProducts.slice(0, 4).forEach(product => {
        const card = document.createElement('div');
        card.className = 'affiliate-card';
        card.innerHTML = `
            <div style="height:120px;display:flex;align-items:center;justify-content:center;
                        background:var(--light-bg);border-radius:16px 16px 0 0;
                        padding:16px;margin-bottom:16px;">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    style="max-width:100%;max-height:70px;object-fit:contain;"
                    onerror="this.style.display='none';this.nextElementSibling.style.display='block';"
                />
                <span style="display:none;font-size:3rem;">${product.icon}</span>
            </div>
            <div style="padding:0 4px;">
                <h3 style="margin-bottom:6px;">${product.name}</h3>
                <div style="display:inline-block;background:var(--light-bg);border-radius:999px;padding:4px 12px;font-size:0.75rem;font-weight:600;color:var(--text-gray);margin-bottom:12px;">${product.category}</div>
                <p style="color:var(--text-gray);margin:12px 0 16px;line-height:1.6;font-size:0.92rem;">${product.description}</p>
                <a href="${product.link || '#'}"
                    target="_blank"
                    rel="noopener sponsored"
                    onclick="${!product.link ? 'return false;' : ''}"
                    style="display:block;width:100%;text-align:center;text-decoration:none;box-sizing:border-box;
                            padding:12px 20px;background:var(--black);color:var(--white);
                            border-radius:999px;font-weight:600;font-size:0.9rem;transition:opacity 0.2s;
                            ${!product.link ? 'opacity:0.4;cursor:not-allowed;pointer-events:none;' : ''}">
                    ${product.cta || 'View Product →'}
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Hero Latest Blog Preview 
function initHeroBlogCard() {
    const el = document.getElementById('heroBlogCard');
    if (!el || typeof blogPosts === 'undefined' || !blogPosts.length) return;

    const post = blogPosts[0];
    el.innerHTML = `
        <a href="pages/blog/${post.slug}.html"
           style="display:block;text-decoration:none;
                  background:var(--dark-surface);
                  border:1px solid var(--dark-border);
                  border-radius:var(--border-radius-lg);
                  padding:20px 24px;
                  transition:background 0.2s;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
                <span style="font-size:0.7rem;font-weight:700;text-transform:uppercase;
                             letter-spacing:0.8px;color:rgba(255,255,255,0.35);">Latest Post</span>
                <span style="font-size:0.7rem;color:rgba(255,255,255,0.25);">·</span>
                <span style="font-size:0.7rem;color:rgba(255,255,255,0.35);">${post.readTime}</span>
            </div>
            <div style="display:flex;align-items:center;gap:14px;">
                ${post.image
                    ? `<img src="${post.image}" alt="${post.title}"
                            style="width:52px;height:52px;object-fit:cover;
                                    border-radius:10px;flex-shrink:0;">`
                    : `<span style="font-size:2rem;flex-shrink:0;">${post.emoji}</span>`
                }
                <div>
                    <h4 style="font-size:0.95rem;font-weight:700;color:var(--white);
                               margin:0 0 4px;line-height:1.3;">${post.title}</h4>
                    <p style="font-size:0.82rem;color:rgba(255,255,255,0.45);
                              margin:0;line-height:1.5;
                              display:-webkit-box;-webkit-line-clamp:2;
                              -webkit-box-orient:vertical;overflow:hidden;">${post.excerpt}</p>
                </div>
            </div>
            <div style="margin-top:14px;padding-top:14px;
                        border-top:1px solid var(--dark-border);
                        font-size:0.8rem;font-weight:600;
                        color:rgba(255,255,255,0.4);">
                Read post →
            </div>
        </a>
    `;

    el.querySelector('a').addEventListener('mouseenter', function() {
        this.style.background = 'var(--dark-surface-2)';
    });
    el.querySelector('a').addEventListener('mouseleave', function() {
        this.style.background = 'var(--dark-surface)';
    });
}

// ─── RANDOM AD (hero placeholder) ────
function initRandomAd() {
    const adTemplate = (ad) => `
        <div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;
                    letter-spacing:1px;color:var(--text-gray);margin-bottom:8px;">
            ${ad.type === 'house' ? 'Advertisement' : 'Featured App'}
        </div>
        <strong style="display:block;font-size:1.1rem;margin-bottom:8px;color:var(--white);">${ad.title}</strong>
        <p style="color:rgba(255,255,255,0.6);font-size:0.9rem;line-height:1.6;margin-bottom:16px;">${ad.description}</p>
        <a href="${ad.link}"
           style="display:inline-block;padding:10px 24px;background:rgba(255,255,255,0.15);
                color:var(--white);font-weight:600;font-size:0.9rem;text-decoration:none;border-radius:999px;">
            Learn More →
        </a>
    `;

    const ad1 = document.getElementById('randomAd');
    const ad2 = document.getElementById('randomAd2');
    if (ad1 && randomAds[0]) ad1.innerHTML = adTemplate(randomAds[0]);
    if (ad2 && randomAds[1]) ad2.innerHTML = adTemplate(randomAds[1]);
}

// ─── HERO APP MOCKUPS ────
function initHeroMockups() {
    mcjohnsonApps.forEach(app => {
        const id = 'heroMockup' + app.name;
        const el = document.getElementById(id);
        if (!el) return;
        if (app.screenshot) {
            el.innerHTML = `<img src="${app.screenshot}" alt="${app.name} screenshot"
                                 style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`;
        } else {
            el.innerHTML = `<span style="font-size:4rem;">${app.icon}</span>`;
        }
    });
}

function initFeaturedApps() {
    const showcase = document.getElementById('featuredAppsShowcase');
    if (!showcase) return;

    const featured = mcjohnsonApps.filter(a => a.featured);
    showcase.innerHTML = featured.map(app => `
        <div class="app-card ${app.mockupTheme === 'dark' ? 'tilted-left' : 'tilted-right'}">
            <div class="phone-mockup ${app.mockupTheme === 'dark' ? 'black' : 'white'}"
                 style="${app.screenshot ? 'padding:0;overflow:hidden;' : ''}">
                ${app.screenshot
                    ? `<img src="${app.screenshot}" alt="${app.name} screenshot"
                             style="width:100%;height:100%;object-fit:cover;border-radius:inherit;"
                             onerror="this.style.display='none';">`
                    : `<span style="font-size:4rem;">${app.icon}</span>`
                }
            </div>
            <h4>${app.name}</h4>
            <button class="download-btn" onclick="showDownloadModal('${app.name}')">Download</button>
        </div>
    `).join('');
}

// ─── SCROLL PARTNERS BAR ─────────────────────
function initScrollPartners() {
    const rowLeft  = document.getElementById('scrollLeft');
    const rowRight = document.getElementById('scrollRight');
    if (!rowLeft || !rowRight) return;

    // Build card HTML
    function buildCards(items) {
        return items.map(p => `
            <a class="partner-card" href="${p.link && !p.link.startsWith('YOUR_') ? p.link : '#'}"
               ${p.link && !p.link.startsWith('YOUR_') ? 'target="_blank" rel="noopener"' : 'onclick="return false;"'}
               style="text-decoration:none;display:flex;align-items:center;justify-content:center;padding:12px 24px;">
                ${p.logo
                    ? `<img src="${p.logo}" alt="${p.name}"
                            style="max-height:32px;max-width:120px;object-fit:contain;"
                            onerror="this.style.display='none';this.nextElementSibling.style.display='block';">
                       <span style="display:none;font-weight:700;">${p.name}</span>`
                    : `<h3 style="margin:0;white-space:nowrap;">${p.name}</h3>`
                }
            </a>
        `).join('');
    }

    // Duplicate for seamless infinite scroll
    const doubled = [...scrollPartners, ...scrollPartners];
    rowLeft.innerHTML  = buildCards(doubled);
    rowRight.innerHTML = buildCards([...doubled].reverse());
}

// ─── AD IMPRESSION TRACKING (localStorage, free) ─────
// Stores: { adId: { impressions: N, clicks: N, firstSeen: ISO, lastSeen: ISO } }
// Advertisers can see this via browser devtools.
// For proper tracking → connect GA4 (already set up) and use UTM links.

function trackAdImpressions() {
    // Track one impression per page load per unique ad id
    const paying = (typeof currentAdvertisers !== 'undefined')
        ? currentAdvertisers.filter(a => a.active)
        : [];
    const trackIds = paying.length > 0
        ? paying.map(a => a.company)
        : ['house-1', 'house-2', 'house-3'];
    const uniqueAdIds = [...new Set(trackIds)];
    uniqueAdIds.forEach(id => {
        const key = `ad_stats_${id}`;
        try {
            const raw = localStorage.getItem(key);
            const stats = raw ? JSON.parse(raw) : { impressions: 0, clicks: 0, firstSeen: new Date().toISOString(), lastSeen: null };
            stats.impressions += 1;
            stats.lastSeen = new Date().toISOString();
            localStorage.setItem(key, JSON.stringify(stats));
        } catch(e) { /* storage unavailable */ }
    });
}

function trackAdClick(adId) {
    const key = `ad_stats_${adId}`;
    try {
        const raw = localStorage.getItem(key);
        const stats = raw ? JSON.parse(raw) : { impressions: 0, clicks: 0, firstSeen: new Date().toISOString(), lastSeen: null };
        stats.clicks += 1;
        stats.lastSeen = new Date().toISOString();
        localStorage.setItem(key, JSON.stringify(stats));
    } catch(e) {}
}

// Expose for advertiser report page
window.getAdStats = function() {
    const report = {};
    adBoosts.forEach(ad => {
        try {
            const raw = localStorage.getItem(`ad_stats_${ad.id}`);
            report[ad.company + ' (' + ad.id + ')'] = raw ? JSON.parse(raw) : { impressions: 0, clicks: 0 };
        } catch(e) {}
    });
    return report;
};

// ─── MODALS ───
function showAdModal(ad) {
    const modal = document.getElementById('adModal');
    const content = document.getElementById('adModalContent');
    if (!modal || !content) return;

    content.innerHTML = `
        <h2 style="margin-bottom:20px;">${ad.title || ad.company}</h2>
        <p style="margin-bottom:30px;line-height:1.8;color:var(--text-gray);">${ad.description}</p>
        <a class="btn-primary" href="${ad.link}" style="text-decoration:none;">Learn More →</a>
    `;
    modal.classList.add('active');
}

function closeAdModal() {
    const modal = document.getElementById('adModal');
    if (modal) modal.classList.remove('active');
}

function showDownloadModal(appName) {
    const modal = document.getElementById('downloadModal');
    if (!modal) return;

    const app = mcjohnsonApps.find(a => a.name === appName);
    if (!app) return;

    document.getElementById('modalAppName').textContent = 'Download ' + appName;
    modal.classList.add('active');
    modal.dataset.currentApp = appName;

    const iosBtn = document.getElementById('iosDownloadBtn');
    const androidBtn = document.getElementById('androidDownloadBtn');
    const iosNote = document.getElementById('iosAvailability');
    const androidNote = document.getElementById('androidAvailability');

    if (app.iosLink) {
        iosBtn.disabled = false;
        iosBtn.style.opacity = '1';
        iosBtn.style.cursor = 'pointer';
        iosNote.textContent = 'Available on App Store';
    } else {
        iosBtn.disabled = true;
        iosBtn.style.opacity = '0.8';
        iosBtn.style.cursor = 'not-allowed';
        iosNote.textContent = 'Not yet available';
    }

    if (app.androidLink) {
        androidBtn.disabled = false;
        androidBtn.style.opacity = '1';
        androidBtn.style.cursor = 'pointer';
        androidNote.textContent = 'Available on Google Play';
    } else {
        androidBtn.disabled = true;
        androidBtn.style.opacity = '0.8';
        androidBtn.style.cursor = 'not-allowed';
        androidNote.textContent = 'Not yet available';
    }
}

function closeDownloadModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) modal.classList.remove('active');
}

function downloadApp(platform) {
    const modal = document.getElementById('downloadModal');
    const app = mcjohnsonApps.find(a => a.name === modal.dataset.currentApp);
    if (app) {
        const link = platform === 'ios' ? app.iosLink : app.androidLink;
        if (link) window.open(link, '_blank');
    }
    closeDownloadModal();
}

document.addEventListener('click', function(event) {
    const downloadModal = document.getElementById('downloadModal');
    const adModal = document.getElementById('adModal');
    if (downloadModal && event.target === downloadModal) closeDownloadModal();
    if (adModal && event.target === adModal) closeAdModal();
});