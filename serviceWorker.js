const CACHE_NAME = "my-cache";
const urlsToCache = ["/", "/index.html", "/favicon.ico", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caché abierto");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("Recuperando del caché: ", event.request.url);
        return response;
      }
      console.log("Recuperando de la red: ", event.request.url);
      return fetch(event.request);
    })
  );
});
