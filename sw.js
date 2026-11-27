const V="trip-v22";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(["./","index.html","manifest.webmanifest","icon-192.png"])))});
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
 if(u.origin===location.origin){ // trang: lấy bản mới nhất, mất mạng thì dùng bản đã lưu
  e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(r,c));return res}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));return}
 if(/wikimedia\.org|autonavi\.com/.test(u.hostname)){ // ảnh & ô bản đồ: dùng bản đã lưu, không có thì tải
  e.respondWith(caches.open(V+"-media").then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{c.put(r,res.clone());return res}))))}});
