// js/cookies.js
(function() {
    if (localStorage.getItem('cookies_accepted')) return;

    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.innerHTML = `
        <div style="
            position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
            background:#0f0f0f;color:#fff;padding:20px 28px;
            border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,0.35);
            display:flex;align-items:center;gap:20px;flex-wrap:wrap;
            max-width:680px;width:calc(100% - 48px);z-index:9999;
            font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
            font-size:0.9rem;line-height:1.5;
        ">
            <p style="margin:0;flex:1;min-width:200px;color:rgba(255,255,255,0.75);">
                This site uses cookies for analytics only. No advertising cookies.
                <a href="pages/legal/privacy.html" style="color:#fff;font-weight:600;">Privacy Policy</a>
            </p>
            <div style="display:flex;gap:10px;flex-shrink:0;">
                <button onclick="acceptCookies()" style="
                    padding:10px 22px;background:#fff;color:#0f0f0f;
                    border:none;border-radius:999px;font-weight:600;
                    font-size:0.88rem;cursor:pointer;">
                    Accept
                </button>
                <button onclick="declineCookies()" style="
                    padding:10px 22px;background:transparent;color:rgba(255,255,255,0.6);
                    border:1.5px solid rgba(255,255,255,0.2);border-radius:999px;
                    font-weight:600;font-size:0.88rem;cursor:pointer;">
                    Decline
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);
})();

function acceptCookies() {
    localStorage.setItem('cookies_accepted', 'true');
    document.getElementById('cookieBanner')?.remove();
}

function declineCookies() {
    localStorage.setItem('cookies_accepted', 'false');
    document.getElementById('cookieBanner')?.remove();
    // Disable GA if declined
    window['ga-disable-G-5REMM1PXPK'] = true;
}