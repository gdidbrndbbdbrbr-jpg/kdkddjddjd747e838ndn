Enterconst CACHE_NAME = 'hussainiya-cache-v1';

// الملفات الأساسية التي سيتم حفظها بالهاتف لتعمل بدون نت
const urlsToCache = [
    '/',
    '/index.html',
    'https://e.top4top.io/p_3874hbdrg1.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // إذا كان الملف موجوداً في الكاش (الهاتف)، قم بتشغيله فوراً
            if (response) {
                return response;
            }
            
            // وإذا كان يحتاج تحميل (صوتية أو فيديو جديد) قم بتحميله من الإنترنت وحفظه
            return fetch(event.request).then(fetchRes => {
                return caches.open(CACHE_NAME).then(cache => {
                    // يحفظ فقط الملفات الآمنة والبيانات في الكاش
                    if (event.request.url.startsWith('http')) {
                        cache.put(event.request, fetchRes.clone());
                    }
                    return fetchRes;
                });
            });
        }).catch(() => {
            // في حال عدم وجود انترنت والملف لم يحمل سابقاً
            console.log("أنت غير متصل بالإنترنت ولم يتم تحميل هذا الملف مسبقاً.");
        })
    );
});
