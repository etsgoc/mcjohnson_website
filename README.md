# McJohnson Website

Personal website for McJohnson — an indie mobile app studio based in Poland, EU.

## What This Is

This is the public-facing website for McJohnson. It serves three purposes:

- **Apps showcase** — Pefi and Yearbook, with download links to the App Store
- **Tech Picks** — Personal affiliate recommendations for tools I actually use
- **Ad space** — Yearly advertising placements for brands targeting a tech audience

## Structure

```
/
├── index.html
├── pages/
│   ├── mcjohnson-apps.html
│   ├── affiliate.html
│   ├── buy-ad-space.html
│   ├── about.html
│   ├── contact.html
│   └── legal/
│       ├── privacy.html          # Site privacy policy
│       └── terms.html            # Site terms of use
├── js/
│   ├── data.js                   # All content lives here
│   ├── app.js
│   ├── navigation.js
│   └── animations.js
├── css/
│   ├── main.css
│   ├── components.css
│   └── responsive.css
├── config/
│   └── analytics.js
└── assets/
    └── img/
        ├── screenshots/          # App screenshots
        └── advertisers/          # Advertiser logos
```

## Adding a New App

1. Add an object to `mcjohnsonApps` in `js/data.js`
2. Drop a screenshot into `assets/img/screenshots/`
3. Create `pages/legal/appname/privacy.html` and `pages/legal/appname/terms.html`
4. Add the `legal` field pointing to those files in the app object

The app auto-appears on the apps page and homepage. No HTML edits needed.

## Adding an Advertiser

1. Collect payment externally (Stripe link or bank)
2. Save their logo to `assets/img/advertisers/`
3. Add their object to `currentAdvertisers` in `js/data.js` with `active: true`
4. Use UTM parameters in their link for click tracking
5. Share GA4 property read access with them for traffic verification

## Adding an Affiliate Product

1. Sign up with the provider and get your affiliate link
2. Add an object to `affiliateProducts` in `js/data.js`

Auto-appears on the picks page and homepage grid.

## Affiliate Disclosure

Some links are affiliate links. A small commission may be earned if a purchase is made, at no extra cost to the buyer. Only personally used products are listed.

## Tech Stack

Static HTML, CSS, vanilla JS. No framework, no build step. Hosted on GitHub Pages.

## Contact

- Advertising: ads@mcjohnson.website
- Support: support@mcjohnson.website
