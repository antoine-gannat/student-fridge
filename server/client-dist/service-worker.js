/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "css/app.ca7c37fd.css",
    "revision": "de513b314be63abcfee6d3ba1df40788"
  },
  {
    "url": "css/chunk-vendors.c2310332.css",
    "revision": "04fe510d982145ce1b5ccc91f80d4f27"
  },
  {
    "url": "img/icons/android-chrome-512x512.png",
    "revision": "6f45729edb0c845ff14589b9c2bd5dda"
  },
  {
    "url": "img/icons/android-icon-144x144.png",
    "revision": "3beaf57f26afcaa9b8b00e429ee8cdbe"
  },
  {
    "url": "img/icons/android-icon-192x192.png",
    "revision": "8d2363bfd44602167349583ed09c9957"
  },
  {
    "url": "img/icons/android-icon-36x36.png",
    "revision": "22b5dbc76af02fd93eb35967a680e412"
  },
  {
    "url": "img/icons/android-icon-48x48.png",
    "revision": "3a13801d25034e93961cb12e9b736954"
  },
  {
    "url": "img/icons/android-icon-72x72.png",
    "revision": "8d7ab6d1668ac4eb27b3fa24fa0384f9"
  },
  {
    "url": "img/icons/android-icon-96x96.png",
    "revision": "93f8228cac3e2c9d6768141637f36958"
  },
  {
    "url": "img/icons/apple-icon-114x114.png",
    "revision": "1d2cc519581bb56dc395ac6d103caad7"
  },
  {
    "url": "img/icons/apple-icon-120x120.png",
    "revision": "8b557146a93b37f65fcb7ed99c48a057"
  },
  {
    "url": "img/icons/apple-icon-144x144.png",
    "revision": "3beaf57f26afcaa9b8b00e429ee8cdbe"
  },
  {
    "url": "img/icons/apple-icon-152x152.png",
    "revision": "8f638e65da21249bc6c663929d235574"
  },
  {
    "url": "img/icons/apple-icon-180x180.png",
    "revision": "7387835b60feeec554e2af913d2141dd"
  },
  {
    "url": "img/icons/apple-icon-57x57.png",
    "revision": "58a86311655b530bc70c5bad9928678c"
  },
  {
    "url": "img/icons/apple-icon-60x60.png",
    "revision": "71cdf36f2d50d601cb4588be158f2bfb"
  },
  {
    "url": "img/icons/apple-icon-72x72.png",
    "revision": "8d7ab6d1668ac4eb27b3fa24fa0384f9"
  },
  {
    "url": "img/icons/apple-icon-76x76.png",
    "revision": "7c216ad978e47baa0232a7b061fe003e"
  },
  {
    "url": "img/icons/apple-icon-precomposed.png",
    "revision": "f59c0348ea73b7499d1373d822b29f2a"
  },
  {
    "url": "img/icons/apple-icon.png",
    "revision": "f59c0348ea73b7499d1373d822b29f2a"
  },
  {
    "url": "img/icons/favicon-16x16.png",
    "revision": "37dda4766e3bc43ebd3cccb8fc9ad99e"
  },
  {
    "url": "img/icons/favicon-32x32.png",
    "revision": "981ee19db5a2ab572fea3224969d5c48"
  },
  {
    "url": "img/icons/favicon-96x96.png",
    "revision": "93f8228cac3e2c9d6768141637f36958"
  },
  {
    "url": "img/icons/favicon.ico",
    "revision": "0268a51e6dbd5c4ad751807a5eae5418"
  },
  {
    "url": "img/icons/ms-icon-144x144.png",
    "revision": "3beaf57f26afcaa9b8b00e429ee8cdbe"
  },
  {
    "url": "img/icons/ms-icon-150x150.png",
    "revision": "adc6e78433e46298f521c13c9e50db21"
  },
  {
    "url": "img/icons/ms-icon-310x310.png",
    "revision": "0b8faefd50148e5a09f3115ebb3fbb3d"
  },
  {
    "url": "img/icons/ms-icon-70x70.png",
    "revision": "a6d4543263e3659da2105ed02fe4c6e0"
  },
  {
    "url": "img/stock.jpg",
    "revision": "1861eb67373c22b707a7111f43fc4ef9"
  },
  {
    "url": "index.html",
    "revision": "2c2cad9b409ac1df0b59fa2833e900fc"
  },
  {
    "url": "js/app.676686d9.js",
    "revision": "6b94fa0fdac3961dc59b4b6972cfd1f6"
  },
  {
    "url": "js/chunk-vendors.4d84a16d.js",
    "revision": "8033bac304a78f084565fcb6338f6ea7"
  },
  {
    "url": "manifest.json",
    "revision": "1fe3cee6f1a50318e9ca17f4b4528672"
  },
  {
    "url": "precache-manifest.e0c162e3b67797908e368c3edaeeeedb.js",
    "revision": "e0c162e3b67797908e368c3edaeeeedb"
  },
  {
    "url": "robots.txt",
    "revision": "b6216d61c03e6ce0c9aea6ca7808f7ca"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
