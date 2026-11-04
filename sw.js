const CACHE="ganitha-sadhana-v1";
const FILES=["./", "index.html", "fonts.css", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png", "fonts/noto-sans-telugu-telugu-400-normal.woff2", "fonts/noto-sans-telugu-latin-400-normal.woff2", "fonts/noto-sans-telugu-telugu-600-normal.woff2", "fonts/noto-sans-telugu-latin-600-normal.woff2", "fonts/noto-sans-telugu-telugu-700-normal.woff2", "fonts/noto-sans-telugu-latin-700-normal.woff2", "fonts/kalam-latin-400-normal.woff2", "fonts/kalam-latin-700-normal.woff2", "fonts/mallanna-telugu-400-normal.woff2", "fonts/mallanna-latin-400-normal.woff2"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{
    if(res.ok&&new URL(e.request.url).origin===location.origin){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}return res;
  }).catch(()=>caches.match("index.html"))))});
