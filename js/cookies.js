// js/cookies.js — cookie consent banner + reopenable settings tab.
// Works from any page depth because it reads SITE_ROOT (set per-page before
// this script is loaded) to build the link to the cookie policy page.
(function () {
    const ROOT = (typeof SITE_ROOT !== 'undefined') ? SITE_ROOT : '';
    const policyHref = ROOT + 'pages/legal/cookies.html';
    const choice = localStorage.getItem('cookies_choice'); // 'accepted' | 'declined' | null

    function iconCookie() {
        return (typeof icon === 'function')
            ? icon('cookie', { size: 18 })
            : '';
    }

    function renderReopenTab() {
        if (document.getElementById('cookieReopen')) return;
        const btn = document.createElement('button');
        btn.id = 'cookieReopen';
        btn.className = 'cookie-reopen';
        btn.setAttribute('aria-label', 'Cookie settings');
        btn.innerHTML = iconCookie();
        btn.onclick = renderBanner;
        document.body.appendChild(btn);
    }

    function removeReopenTab() {
        document.getElementById('cookieReopen')?.remove();
    }

    function renderBanner() {
        removeReopenTab();
        if (document.getElementById('cookieBanner')) return;

        const banner = document.createElement('div');
        banner.id = 'cookieBanner';
        banner.innerHTML = `
            <div class="cookie-card" role="dialog" aria-label="Cookie preferences">
                <div class="cookie-card-top">
                    <span class="cookie-card-icon">${iconCookie()}</span>
                    <p>
                        This site uses cookies for analytics only — no advertising or tracking cookies.
                        Read the <a href="${policyHref}">Cookie Policy</a> or the
                        <a href="${ROOT}pages/legal/privacy.html">Privacy Policy</a> for details.
                    </p>
                </div>
                <div class="cookie-card-actions">
                    <button class="cookie-btn primary" id="cookieAccept">Accept</button>
                    <button class="cookie-btn ghost" id="cookieDecline">Decline</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        document.getElementById('cookieAccept').addEventListener('click', () => setChoice('accepted'));
        document.getElementById('cookieDecline').addEventListener('click', () => setChoice('declined'));
    }

    function setChoice(value) {
        localStorage.setItem('cookies_choice', value);
        // keep old key in sync for any legacy references
        localStorage.setItem('cookies_accepted', value === 'accepted' ? 'true' : 'false');
        document.getElementById('cookieBanner')?.remove();
        if (value === 'declined') {
            window['ga-disable-G-5REMM1PXPK'] = true;
        }
        renderReopenTab();
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (!choice) {
            renderBanner();
        } else {
            if (choice === 'declined') window['ga-disable-G-5REMM1PXPK'] = true;
            renderReopenTab();
        }
    });

    // exposed for the Cookie Policy page's "manage preferences" button
    window.reopenCookiePrefs = renderBanner;
})();
