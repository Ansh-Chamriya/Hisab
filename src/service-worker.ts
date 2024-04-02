/// <reference types="@sveltejs/kit"/>
/// <reference lib="webworker"/>

declare let self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

const ASSETS = [...build, ...files];


// install

self.addEventListener('install', (event) => {
    async function addfilestocache() {
        const cache = await caches.open(version);
        await cache.addAll(ASSETS);
    }

    event.waitUntil(addfilestocache());

});


// activate

self.addEventListener('activate', (event) => {
    async function removeoldcaches() {
        const keys = await caches.keys();
        for (const key of keys) {
            if (key !== version) await caches.delete(key);
        }
    }

    event.waitUntil(removeoldcaches());
});

// fetch

self.addEventListener('fetch', (event) => {
    async function fetchfromcache() {
        const cachedresponse = await caches.match(event.request);
        if (cachedresponse) return cachedresponse;
        return fetch(event.request);
    }

    event.respondWith(fetchfromcache());
});
