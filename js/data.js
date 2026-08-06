// js/data.js — McJohnson Site Data

// ── ADVERTISERS ──────────────────────────────────────────────
// Payment handled outside this file (Paddle/email).
// Once paid, they are added here and set active: true.
// Logo and public links are safe in a public repo.
// link format: "https://yourbrand.com?utm_source=mcjohnson&utm_medium=display&utm_campaign=2026_annual" Then will share my GA4 property access with you — they see real click data in your own Google Analytics. 

const currentAdvertisers = [
    // Example:
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
        { title: "Download Yearbook", description: "Journal your year, track memories and routines.", link: "pages/mcjohnson-apps.html", type: "app" },
        { title: "Get Featured Here", description: "One flat yearly rate. No monthly billing. Your brand in front of a focused tech audience.", link: "pages/buy-ad-space.html", type: "house" }
    ];
    // Pick 2 different ones
    const i = Math.floor(Math.random() * house.length);
    let j = (i + 1 + Math.floor(Math.random() * (house.length - 1))) % house.length;
    return [house[i], house[j]];

}
const randomAds = buildHeroAd(); // now returns array of 2

// ── PARTNERS / SCROLL BAR ─────────────────────────────────────
// These appear in the scrolling marquee section on the homepage.
// logo: path to image or null (shows name text as fallback)

const scrollPartners = [
    { name: "Pefi",      logo: "../assets/img/logos/yearbook.png",  link: "pages/mcjohnson-apps.html" },
    { name: "Yearbook",  logo: "../assets/img/logos/pefi-icon.png",  link: "pages/mcjohnson-apps.html" },
    { name: "Amazon",    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png", link: null },
    { name: "1Password", logo: "../assets/img/logos/1password.png", link: null },
    { name: "Notion",    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", link: null },
    { name: "NordVPN",   logo: "../assets/img/logos/NodeVPN.jpeg", link: null },
    { name: "Setapp",    logo: "../assets/img/logos/Setapp.jpeg", link: null },
    { name: "Raycast",   logo: "../assets/img/logos/Raycast.png", link: null },
];


// ── AFFILIATE PRODUCTS ────────────────────────────────────────
const affiliateProducts = [
    {
        name: "Expo",
        category: "Mobile Dev",
        badge: "What I Build With",
        image: "../assets/img/logos/Expo.png",
        icon: "📱",
        description: "The React Native framework I ship every app with — Pefi, Yearbook, and WanderKit all run on it. Fast iteration, OTA updates, and a great dev loop.",
        link: null,
        cta: "Explore Expo →"
    },
    {
        name: "RevenueCat",
        category: "Monetization",
        badge: "Subscriptions Made Easy",
        image: "https://www.revenuecat.com/favicon-32x32.png",
        icon: "💳",
        description: "Handles subscriptions, paywalls, and receipt validation across iOS and Android so I don't have to build billing infra myself.",
        link: null,
        cta: "Try RevenueCat →"
    },
    {
        name: "Polkadot/Substrate",
        category: "Blockchain Dev",
        badge: "Powers My Chain",
        image: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
        icon: "⛓️",
        description: "The Rust framework I use to build my custom blockchain — modular pallets, flexible consensus, and a serious developer experience.",
        link: null,
        cta: "Learn Substrate →"
    },
    {
        name: "LeetCode",
        category: "Learning",
        badge: "Daily Practice",
        image: "https://cdn.simpleicons.org/leetcode",
        icon: "🧩",
        description: "Where I keep my problem-solving sharp — data structures, algorithms, and interview-style practice between building sessions.",
        link: null,
        cta: "Practice on LeetCode →"
    },
    {
        name: "GoDaddy",
        category: "Domains",
        badge: null,
        image: "https://cdn.simpleicons.org/godaddy",
        icon: "🌐",
        description: "Where I register and manage domains, including mcjohnson.website. Simple DNS management and reliable renewals.",
        link: null,
        cta: "Get a Domain →"
    },
    {
        name: "Tailscale",
        category: "Networking",
        badge: "Free Tier Available",
        image: "../assets/img/logos/TailScale.png",
        icon: "🌐",
        description: "Zero-config VPN connecting all your devices privately. Free plan covers personal use completely.",
        link: null,
        cta: "Get Tailscale Free →"
    },
    {
        name: "Figma",
        category: "Design",
        badge: "Design & Prototyping",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
        icon: "🎨",
        description: "Every screen gets wireframed and prototyped here first — from app UI to this website's layout — before a line of code is written.",
        link: null,
        cta: "Try Figma →"
    },
    {
        name: "Obsidian",
        category: "Productivity",
        badge: "Notes & Second Brain",
        image: "https://cdn.simpleicons.org/obsidian",
        icon: "🗒️",
        description: "Local-first markdown notes — project specs, architecture docs, and daily notes all linked together and stored on my own disk.",
        link: null,
        cta: "Get Obsidian →"
    },
    {
        name: "Claude",
        category: "AI Tooling",
        badge: "Daily Driver",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg",
        icon: "🤖",
        description: "My go-to for planning architecture, debugging, and pairing through everything from Rust pallets to this website redesign.",
        link: null,
        cta: "Try Claude →"
    },
    {
        name: "Stack Overflow",
        category: "Learning",
        badge: null,
        image: "https://cdn.simpleicons.org/stackoverflow",
        icon: "💬",
        description: "Still the first stop for the obscure error message at 2am. An indie dev's best friend when the docs fall short.",
        link: null,
        cta: "Visit Stack Overflow →"
    },
    {
        name: "crates.io",
        category: "Rust Ecosystem",
        badge: "Rust Package Registry",
        image: "https://img.shields.io/crates/v/:crate",
        icon: "📦",
        description: "The official Rust package registry — where I pull every dependency for Substrate pallets and the rest of the chain's Rust codebase.",
        link: "https://crates.io",
        cta: "Browse crates.io →"
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
        rating: 0,
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
            "Privacy-first — no cloud sync",
            "Destination of the Day — discover a new place every day",  
            "Wellness tools — meditation, breathing & reading"  
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
        rating: 0,
        downloads: "Growing",
        iosLink: "https://apps.apple.com/us/app/pefi-private-vault/id6759491941",
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
    },
     {
        name: "WanderKit",
        category: "Travel & Exploration",
        description: "Your personal travel companion. Plan trips, track visited places, and journal your adventures. All data is stored locally on your device — no accounts, no cloud, no data sharing.",
        screenshot: "assets/img/screenshots/wanderkit-preview.png",
        icon: "🧳",
        mockupTheme: "",
        rating: 0,
        downloads: "Growing",
        iosLink: null,
        androidLink: null,
        featured: true,
        features: [
            "Trip planning and itinerary management",
            "Visited places tracker and countries",
            "Travel journaling",
            "Destination discovery and recommendations",
            "Manual data export",
            "Privacy-first — no cloud sync",
            "No travel advice — you stay in control"
        ],
        legal: {
            privacy: "legal/wanderkit/privacy.html",
            terms:   "legal/wanderkit/terms.html"
        }
    }
];

window.siteDataReady = true;
