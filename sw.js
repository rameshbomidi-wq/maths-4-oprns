const CACHE="ganitha-sadhana-v2";
const FILES=["./", "index.html", "fonts.css", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png", "fonts/noto-sans-telugu-telugu-400-normal.woff2", "fonts/noto-sans-telugu-latin-400-normal.woff2", "fonts/noto-sans-telugu-telugu-600-normal.woff2", "fonts/noto-sans-telugu-latin-600-normal.woff2", "fonts/noto-sans-telugu-telugu-700-normal.woff2", "fonts/noto-sans-telugu-latin-700-normal.woff2", "fonts/kalam-latin-400-normal.woff2", "fonts/kalam-latin-700-normal.woff2", "fonts/mallanna-telugu-400-normal.woff2", "fonts/mallanna-latin-400-normal.woff2"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(FILES.map(f=>c.add(f).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
/* network first (so updates on GitHub reach the phone), saved copy when offline */
self.addEventListener("fetch",e=>{const req=e.request;if(req.method!=="GET"||new URL(req.url).origin!==location.origin)return;
  e.respondWith(fetch(req).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(req,cp))}return res})
    .catch(()=>caches.match(req,{ignoreSearch:true}).then(r=>r||(req.mode==="navigate"?caches.match("index.html"):Response.error()))))});
