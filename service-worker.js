self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/BTC-price-clock/',
                '/BTC-price-clock/index.html',
                '/BTC-price-clock/renderer.js',
                '/BTC-price-clock/icons/apple-touch-icon-60x60.png',
                '/BTC-price-clock/icons/apple-touch-icon-76x76.png',
                '/BTC-price-clock/icons/apple-touch-icon-120x120.png',
                '/BTC-price-clock/icons/apple-touch-icon-152x152.png',
                '/BTC-price-clock/icons/apple-touch-icon-180x180.png',
                '/BTC-price-clock/icons/android-chrome-192x192.png',
                '/BTC-price-clock/icons/android-chrome-512x512.png',
                '/BTC-price-clock/icons/favicon-32x32.png',
                '/BTC-price-clock/icons/favicon-16x16.png',
                '/BTC-price-clock/icons/favicon.ico',
                '/BTC-price-clock/icons/safari-pinned-tab.svg',
                '/BTC-price-clock/icons/browserconfig.xml',
                '/BTC-price-clock/icons/site.webmanifest',
                '/BTC-price-clock/mstile-150x150.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
