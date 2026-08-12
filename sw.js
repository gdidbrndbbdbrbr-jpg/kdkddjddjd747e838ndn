// تفعيل الملف مباشرة بدون انتظار
self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
});

// 1. الاستماع للإشعارات وعرضها بالشريط العلوي
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'تطبيق حسينية الشعباوي';
    const options = {
        body: data.body || 'إشعار جديد',
        icon: 'https://e.top4top.io/p_3874hbdrg1.jpg', // صورة الإشعار
        badge: 'https://e.top4top.io/p_3874hbdrg1.jpg', // أيقونة صغيرة تظهر بشريط الإشعارات
        vibrate: [200, 100, 200, 100, 200] // نمط اهتزاز الموبايل عند وصول الإشعار
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// 2. ماذا يحدث عند الضغط على الإشعار من الشريط العلوي؟
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // إغلاق الإشعار بعد الضغط عليه
    
    // فتح التطبيق أو التركيز عليه إذا كان مفتوح بالخلفية
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(function(clientList) {
            if (clientList.length > 0) {
                let client = clientList[0];
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        client = clientList[i];
                    }
                }
                return client.focus();
            }
            return clients.openWindow('/');
        })
    );
});
