//Asignar nombre y version de la cache
//Constante

const CACHE_NAME = 'v1_cache_PWA';

//ficheros que se van a estara guardando en la
//aplicacion que se van a ver offline

let urlsToCache = [
    './',
    './Images/favicon.ico',
    './Images/IMG-20240928-WA0007[1].jpg',
    './Images/photo 16.jpg',
    './Images/photo 32.jpg',
    './Images/photo 64.jpg',
    './Images/photo 96.jpg',
    './Images/photo 128.jpg',
    './Images/photo 192.jpg',
    './Images/photo 256.jpg',
    './Images/photo 384.jpg',
    './Images/photo 512.jpg',
    './Images/photo 1024.jpg',
    './Styles/index.css'
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            .then(() => {
                self.skipWaiting();
            })
            .catch(err => {
                console.log('No se ha cargado la cache', err);
            })
        })
    );
});

self.addEventListener('activate', e => {
    // Añadimos todos los elementos en la cache
    
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
        .then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheWhiteList.indexOf(cacheName) === -1){
                        //Borrar los elementos que ya no esten en
                        //la cache o no se necesiten
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            //Activar cache en el dispositivo
            self.clients.claim()
        })
    )
});

self.addEventListener('fetch', e => {
    e.respondWith(
      caches.match(e.request)
        .then(res => {
          if (res) {
            // devuelvo datos desde cache
            return res;
          }
          return fetch(e.request);
        })
    );
  });
  