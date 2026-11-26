/* EduEval Local - service worker. Solo guarda los archivos de la aplicación; nunca datos de usuario
   (los datos viven cifrados en IndexedDB y este script no los toca). */
const VERSION = '2.24-81557b946d';
const CACHE = 'edueval-' + VERSION;
const ARCHIVOS = [
  './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png', './icons/favicon-32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS.map(u => new Request(u, { cache: 'reload' })))));
  // No se llama a skipWaiting(): la versión nueva espera a que la persona pulse «Actualizar ahora».
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const claves = await caches.keys();
    await Promise.all(claves.filter(k => k.startsWith('edueval-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;           // p. ej. la API de IA: no se intercepta
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (url.pathname.endsWith('/licencia-config.json')) {   // siempre la versión publicada; la guardada solo sin conexión
      try { const r = await fetch(req, { cache: 'no-store' }); if (r && r.ok) cache.put(req, r.clone()); return r; }
      catch (_) { return (await cache.match(req, { ignoreSearch: true })) || Response.error(); }
    }
    if (req.mode === 'navigate') {
      const index = await cache.match('./index.html');
      if (index) return index;
      try { return await fetch(req); } catch (_) { return Response.error(); }
    }
    const guardado = await cache.match(req, { ignoreSearch: true });
    if (guardado) return guardado;
    try {
      const resp = await fetch(req);
      if (resp && resp.ok && resp.type === 'basic') cache.put(req, resp.clone());
      return resp;
    } catch (_) { return Response.error(); }
  })());
});
