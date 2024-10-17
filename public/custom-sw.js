self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("todo-list-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/icon-192x192.png",
        "/icon-512x512.png",
        "/src/index.css",
        "/src/components/TodoList.jsx",
        // Add other necessary assets
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
