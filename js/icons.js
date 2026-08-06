// js/icons.js — Shared icon library for the whole site.
// All icons are hand-built inline SVG (stroke-based "feather-style" glyphs for UI icons,
// simple monochrome brand marks for social/app links). No external icon fonts, no raster
// images — everything here scales perfectly and inherits currentColor.
//
// Usage: ICONS.name  -> returns an <svg>...</svg> string sized by CSS (width/height: 1em by default)
// Add new icons here once and every page picks them up automatically.

const ICON_PATHS = {
    // ── UI / navigation ──────────────────────────────────────
    back:        '<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>',
    chevronDown: '<polyline points="6 9 12 15 18 9"></polyline>',
    chevronUp:   '<polyline points="18 15 12 9 6 15"></polyline>',
    close:       '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
    external:    '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>',
    arrowRight:  '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>',
    check:       '<polyline points="20 6 9 17 4 12"></polyline>',

    // ── section icons (used as fallback tile glyphs) ─────────
    user:        '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
    mail:        '<rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 6-10 7L2 6"></path>',
    grid:        '<rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect>',
    edit:        '<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"></path>',
    link:        '<path d="M15 7h3a5 5 0 0 1 0 10h-3"></path><path d="M9 17H6A5 5 0 0 1 6 7h3"></path><line x1="8" y1="12" x2="16" y2="12"></line>',
    tool:        '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"></path>',

    // ── misc content icons ────────────────────────────────────
    cookie:      '<circle cx="12" cy="12" r="9"></circle><circle cx="8.5" cy="10.5" r="0.9" fill="currentColor" stroke="none"></circle><circle cx="14.5" cy="8.5" r="0.9" fill="currentColor" stroke="none"></circle><circle cx="15" cy="14.5" r="0.9" fill="currentColor" stroke="none"></circle><circle cx="9.5" cy="15" r="0.9" fill="currentColor" stroke="none"></circle>',
    shield:      '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"></path>',
    globe:       '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"></path>',
    clock:       '<circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15.5 14"></polyline>',
    apple:       'FILL::M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z',

    // ── brand / social marks (filled, viewBox 0 0 24 24) ─────
    x:           'FILL::M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    github:      'STROKE::<path d="M9 19c-4.7 1.4-4.7-2.4-6.5-2.8m13 4.8v-3.2a3.1 3.1 0 0 0-.9-2.5c2.9-.3 5.9-1.4 5.9-6.4a5 5 0 0 0-1.3-3.4 4.6 4.6 0 0 0-.1-3.4s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.4 0C6.9.8 5.8 1.1 5.8 1.1a4.6 4.6 0 0 0-.1 3.4A5 5 0 0 0 4.4 7.9c0 5 3 6.1 5.9 6.4a3.1 3.1 0 0 0-.9 2.4V20"></path>',
    instagram:   'STROKE::<rect x="2.5" y="2.5" width="19" height="19" rx="5.5"></rect><circle cx="12" cy="12" r="4.3"></circle><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none"></circle>',
    telegram:    'FILL::M21.9 3.3 2.7 10.8c-1.3.5-1.3 1.2-.2 1.6l4.9 1.5 1.9 5.8c.2.6.4.8.9.8.5 0 .7-.2 1-.5l2.3-2.2 4.9 3.6c.9.5 1.5.2 1.8-.8L23.9 4.6c.4-1.3-.4-1.8-1.9-1.3zM8.6 13.7l9.5-6c.5-.3.9-.1.6.3l-8 7.3-.3 3.1-1.4-4.7z',
    telegramAlt: 'STROKE::<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>',
};

/**
 * Build an inline <svg> element string for a given icon name.
 * @param {string} name - key in ICON_PATHS
 * @param {object} opts - { size, strokeWidth, className }
 */
function icon(name, opts = {}) {
    const def = ICON_PATHS[name];
    if (!def) return '';
    const size = opts.size || 20;
    const cls = opts.className ? ` ${opts.className}` : '';

    if (def.startsWith('FILL::')) {
        const d = def.replace('FILL::', '');
        return `<svg class="icon icon-fill${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${d}"></path></svg>`;
    }
    if (def.startsWith('STROKE::')) {
        const body = def.replace('STROKE::', '');
        const sw = opts.strokeWidth || 1.8;
        return `<svg class="icon icon-stroke${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
    }
    // default: outline group (feather-style, path/line/etc mixed markup)
    const sw = opts.strokeWidth || 1.8;
    return `<svg class="icon icon-stroke${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${def}</svg>`;
}

window.ICONS = ICON_PATHS;
window.icon = icon;
