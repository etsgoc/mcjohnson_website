// js/data.js — McJohnson Site Data

// ── ADVERTISERS ──────────────────────────────────────────────
// Payment handled outside this file (Paddle/email).
// Once paid, they are added here and set active: true.
// Logo and public links are safe in a public repo.
// link format: "https://yourbrand.com?utm_source=mcjohnson&utm_medium=display&utm_campaign=2026_annual" Then will share my GA4 property access with you — they see real click data in your own Google Analytics. 

const currentAdvertisers = [
    // Example — uncomment and fill when you have a paying advertiser:
     {/*
         company: "Acme Corp",
         tagline: "The best tool for indie developers",
         logo: "https://raw.githubusercontent.com/etsgoc/logos/refs/heads/main/Yearbook.png",
         link: "https://acme.com?utm_source=mcjohnson&utm_medium=banner&utm_campaign=2026_annual",  
         active: true
     */}
];

// AD BOOST BAR 
function buildAdBoosts() {
    const paying = currentAdvertisers.filter(a => a.active);
    const base = paying.length > 0
        ? paying.map(a => ({ company: a.company, description: a.tagline, link: a.link, logo: a.logo || null, type: 'paid' }))
        : [
            { company: "Advertise Here", description: "Reach monthly tech visitors — $599/year", link: "pages/buy-ad-space.html", type: "house" },
            { company: "Advertise Here", description: "One flat yearly rate. No monthly billing. Click to learn more.", link: "pages/buy-ad-space.html", type: "house" },
            { company: "Advertise Here", description: "Your brand in front of a focused tech audience — $599/year", link: "pages/buy-ad-space.html", type: "house" }
        ];
    return [...base, ...base, ...base]; 
}
const adBoostsFull = buildAdBoosts();

//HERO AD 
function buildHeroAd() {
    const paying = currentAdvertisers.filter(a => a.active);
    if (paying.length > 0) {
        const ad = paying[0];
        return { title: ad.company, description: ad.tagline, link: ad.link, logo: ad.logo || null, type: 'paid' };
    }
    const house = [
        { title: "Advertise on McJohnson", description: "$599/year flat. Reach 10K+ monthly tech visitors.", link: "pages/buy-ad-space.html", type: "house" },
        { title: "Download Pefi", description: "Privacy-first personal finance. Track income, expenses, and trades.", link: "pages/mcjohnson-apps.html", type: "app" },
        { title: "Download Yearbook", description: "Journal your year, track memories and routines.", link: "pages/mcjohnson-apps.html", type: "app" }
    ];
    return house[Math.floor(Math.random() * house.length)];
}
const randomAds = [buildHeroAd()]; // legacy alias

// ── PARTNERS / SCROLL BAR ─────────────────────────────────────
// These appear in the scrolling marquee section on the homepage.
// logo: path to image or null (shows name text as fallback)

const scrollPartners = [
    { name: "Pefi",      logo: "../assets/img/logos/yearbook.png",  link: "pages/mcjohnson-apps.html" },
    { name: "Yearbook",  logo: "../assets/img/logos/pefi-icon.png",  link: "pages/mcjohnson-apps.html" },
    { name: "Amazon",    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png", link: "YOUR_AMAZON_AFFILIATE_LINK_HERE" },
    { name: "1Password", logo: "../assets/img/logos/1password.png", link: "YOUR_1PASSWORD_AFFILIATE_LINK_HERE" },
    { name: "Notion",    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", link: "YOUR_NOTION_AFFILIATE_LINK_HERE" },
    { name: "NordVPN",   logo: "../assets/img/logos/NodeVPN.jpeg", link: "YOUR_NORDVPN_AFFILIATE_LINK_HERE" },
    { name: "Setapp",    logo: "../assets/img/logos/Setapp.jpeg", link: "YOUR_SETAPP_AFFILIATE_LINK_HERE" },
    { name: "Raycast",   logo: "../assets/img/logos/Raycast.png", link: "YOUR_RAYCAST_AFFILIATE_LINK_HERE" },
];


// ── AFFILIATE PRODUCTS ────────────────────────────────────────
// Replace each link with your real affiliate URL after signing up:
//   Amazon:    associates.amazon.com
//   1Password: 1password.com/for/businesses/affiliates
//   NordVPN:   affiliates.nordvpn.com
//   Notion:    notion.com/affiliates
//   Setapp:    setapp.com/affiliates
//   Tailscale: tailscale.com/partners
//   Raycast:   account settings at raycast.com

const affiliateProducts = [
    {
        name: "Amazon",
        category: "Shopping",
        badge: "Best for Hardware",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png",
        icon: "📦",
        description: "Where I buy most of my gear — cables, desk accessories, gadgets. Use this link to support the site at zero extra cost to you.",
        link: "YOUR_AMAZON_AFFILIATE_LINK_HERE",
        cta: "Shop on Amazon →"
    },
    {
        name: "1Password",
        category: "Security",
        badge: "What I Use Daily",
        image: "../assets/img/logos/1password.png",
        icon: "🔐",
        description: "The best password manager I've ever used. Works seamlessly across all my Apple devices and integrates with apps, browsers, and Touch ID.",
        link: "YOUR_1PASSWORD_AFFILIATE_LINK_HERE",
        cta: "Try 1Password →"
    },
    {
        name: "NordVPN",
        category: "Security",
        badge: null,
        image: "../assets/img/logos/NodeVPN.jpeg",
        icon: "🛡️",
        description: "Fast, reliable VPN I use when working from airports or cafes. Covers up to 10 devices on one account.",
        link: "YOUR_NORDVPN_AFFILIATE_LINK_HERE",
        cta: "Get NordVPN →"
    },
    {
        name: "Notion",
        category: "Productivity",
        badge: "Free to Start",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
        icon: "📝",
        description: "My second brain. App roadmaps, notes, planning, and reading lists all inside Notion. Free plan is enough for most personal use.",
        link: "YOUR_NOTION_AFFILIATE_LINK_HERE",
        cta: "Try Notion Free →"
    },
    {
        name: "Setapp",
        category: "Apps & Subscriptions",
        badge: "Best Value on Mac",
        image: "../assets/img/logos/Setapp.jpeg",
        icon: "📱",
        description: "One subscription unlocks 240+ Mac and iPhone apps. If you already pay for 2–3 apps on Mac, this likely pays for itself.",
        link: "YOUR_SETAPP_AFFILIATE_LINK_HERE",
        cta: "Try Setapp →"
    },
    {
        name: "Tailscale",
        category: "Networking",
        badge: "Free Tier Available",
        image: "../assets/img/logos/TailScale.png",
        icon: "🌐",
        description: "Zero-config VPN connecting all your devices privately. Free plan covers personal use completely.",
        link: "YOUR_TAILSCALE_AFFILIATE_LINK_HERE",
        cta: "Get Tailscale Free →"
    },
    {
        name: "Raycast",
        category: "Productivity",
        badge: "Mac Only",
        image: "../assets/img/logos/Raycast.png",
        icon: "🚀",
        description: "Replaced Spotlight on my Mac entirely. Launches apps, runs scripts, integrates with GitHub and Notion. Free version covers 95% of what you need.",
        link: "YOUR_RAYCAST_AFFILIATE_LINK_HERE",
        cta: "Download Raycast →"
    },
    {
        name: "iCloud+",
        category: "Apps & Subscriptions",
        badge: "Apple Ecosystem",
        image: "../assets/img/logos/ICloud.png",
        icon: "☁️",
        description: "The obvious storage solution in the Apple ecosystem. 200GB is $3/month and covers iPhone backups, Mac documents, and family sharing.",
        link: "YOUR_APPLE_AFFILIATE_LINK_HERE",
        cta: "Get iCloud+ →"
    }
];


// ── BLOG POSTS ────────────────────────────────────────────────
// Add new posts to the TOP of this array. First = featured on blog index.
const blogPosts = [
    {
        slug: "best-privacy-apps-2026",
        title: "The Best Privacy Apps for 2026",
        subtitle: "Tools that actually protect your data — tested and used daily.",
        excerpt: "Not a sponsored list. These are the tools I actually run on my devices — password managers, VPNs, private networking, and finance tracking without the cloud.",
        category: "Privacy",
        date: "March 2026",
        readTime: "5 min read",
        emoji: "🔒",
        image: "../assets/img/blog/security.jpeg"
    },
    {
        slug: "how-i-built-my-first-two-apps",
        title: "How I Built My First Two Apps as a Solo Developer",
        subtitle: "From idea to launch — the real process behind Pefi and Yearbook.",
        excerpt: "No team, no funding — just tools, iteration, and a lot of mistakes. Here's exactly how I built and shipped my first two apps as a solo developer.",
        category: "Dev",
        date: "February 2026",
        readTime: "8 min read",
        emoji: "⚙️",
        image: "../assets/img/blog/appslogos.png"
    },
    {
        slug: "tools-every-indie-developer-should-use",
        title: "Tools Every Indie Developer Should Use",
        subtitle: "My actual toolkit — not a sponsored list.",
        excerpt: "After building apps solo, these are the tools that actually stuck. No fluff, no hype — just what works.",
        category: "Tools",
        date: "January 2026",
        readTime: "6 min read",
        emoji: "🛠️",
        image: "../assets/img/blog/tools.jpeg"
    }
];


// ── MCJOHNSON APPS ─────
// iosLink/androidLink is set to null if not yet published.

const mcjohnsonApps = [
    {
        name: "Yearbook",
        category: "Productivity & Journaling",
        description: "Track your year day by day. Write daily journals with auto-save, manage events and memories, build routines, store encrypted secrets, and save links — all stored locally on your device. Your data never leaves your phone.",
        screenshot: "assets/img/screenshots/yearbook-preview.PNG", 
        icon: "📓",
        mockupTheme: "dark",
        rating: 4.8,
        downloads: "Growing",
        iosLink: null,
        androidLink: null,
        featured: true,
        features: [
            "365-day calendar view",
            "Daily journal with auto-save drafts",
            "Events & memories with photos/videos",
            "Routines and habit tracking",
            "Encrypted secrets (biometric-protected)",
            "Manual export & backup",
            "Privacy-first — no cloud sync"
        ],
        legal: {
            privacy: "legal/yearbook/privacy.html",
            terms:   "legal/yearbook/terms.html"
        }
    },
    {
        name: "Pefi",
        category: "Personal Finance",
        description: "Personal finance and risk management built for privacy. Track income, expenses, assets, and trades. Get a financial health score. Calculate trading risk. All data stays on your device — no accounts, no cloud, no data sharing.",
        screenshot: "assets/img/screenshots/pefi-preview.PNG",
        icon: "💹",
        mockupTheme: "",
        rating: 4.9,
        downloads: "Growing",
        iosLink: null,
        androidLink: null,
        featured: true,
        features: [
            "Income & expense tracking",
            "Asset management (bank, crypto, property)",
            "Trading risk calculator",
            "Financial health score",
            "Manual data export",
            "Privacy-first — no cloud sync",
            "No financial advice — you stay in control"
        ],
        legal: {
            privacy: "legal/pefi/privacy.html",
            terms:   "legal/pefi/terms.html"
        }
    }
];

window.siteDataReady = true;