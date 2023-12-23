// implement service worker features
// https://developers.google.com/web/fundamentals/primers/service-workers/

// cache name
const CACHE_NAME = 'cache-v1';
// what does cache name do
// https://stackoverflow.com/questions/39109789/what-do-we-mean-by-cache-name-in-service-worker

self.addEventListener('install', function(event) {
    caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll([
            '/manifest.json',
            '/sw.js',
            '/offline.html',
            '/css/offline.css'
        ]);
    });
});

self.addEventListener('fetch', function(event) {
    // check if user is offline
    if (!navigator.onLine) {
        // check if request is for an html page
        if (event.request.headers.get('accept').includes('text/html')) {
            // return the cached offline page
            event.respondWith(
                // get the cached offline page with css
                caches.match('/offline.html').then(function(response) {
                    return response;
                })
            );
        }
    } else {
        // respond to all requests with the cached version
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    }
});