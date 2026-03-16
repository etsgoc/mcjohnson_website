// config/analytics.js - Google Analytics Setup

// Google Analytics 4 Configuration

(function() {
    // Your Google Analytics Measurement ID
    const GA_MEASUREMENT_ID = 'G-5REMM1PXPK'; 
    
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        'send_page_view': true,
        'anonymize_ip': true // GDPR compliance
    });
    
    // Make gtag available globally
    window.gtag = gtag;
    
    // Track custom events
    window.trackEvent = function(eventName, eventParams = {}) {
        if (window.gtag) {
            gtag('event', eventName, eventParams);
        }
    };
    
    // Track outbound links (affiliate links)
    document.addEventListener('click', function(event) {
        const link = event.target.closest('a');
        if (link && link.href && link.hostname !== window.location.hostname) {
            gtag('event', 'click', {
                'event_category': 'outbound_link',
                'event_label': link.href,
                'transport_type': 'beacon'
            });
        }
    });
    
    // Track download button clicks
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('download-btn') || 
            event.target.classList.contains('download-option')) {
            const appName = event.target.closest('[data-app-name]')?.dataset.appName || 'Unknown';
            gtag('event', 'app_download_click', {
                'event_category': 'engagement',
                'event_label': appName
            });
        }
    });
    
    // Track ad clicks
    window.trackAdClick = function(adName, adType) {
        gtag('event', 'ad_click', {
            'event_category': 'advertisement',
            'event_label': adName,
            'ad_type': adType
        });
    };
    
    // Track affiliate link clicks
    window.trackAffiliateClick = function(productName, link) {
        gtag('event', 'affiliate_click', {
            'event_category': 'affiliate',
            'event_label': productName,
            'affiliate_link': link
        });
    };
    
    // Track startup inquiries
    window.trackStartupInquiry = function(startupName) {
        gtag('event', 'startup_inquiry', {
            'event_category': 'engagement',
            'event_label': startupName
        });
    };
})();

// Optional: Facebook Pixel 
/*
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
*/