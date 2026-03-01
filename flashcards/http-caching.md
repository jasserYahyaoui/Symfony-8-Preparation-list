# Flashcards : HTTP Caching (Symfony 8.0)
> High-density deck — 5-15+ cards per sub-heading.
> ⚠️ ESI (Edge Side Includes) is EXPLICITLY OUT OF SCOPE for the Symfony 8.0 exam.

---

### HttpCache component

**Q: What is the Symfony `HttpCache` component and what does it implement?**
**A:** A reverse proxy cache written in pure PHP. It implements the HTTP caching specification (RFC 7234), sitting between the client and the Symfony application. It serves cached responses without hitting the application.
**Code Snippet:**
```php
// public/index.php (with HttpCache)
$kernel  = new Kernel($_SERVER['APP_ENV'], (bool)$_SERVER['APP_DEBUG']);
$cache   = new HttpCache($kernel);
$request = Request::createFromGlobals();
$response = $cache->handle($request);
$response->send();
```

---

**Q: What does `HttpCache` wrap and how is it activated?**
**A:** It wraps the `Kernel` object. Activate by replacing `$kernel->handle($request)` with a `HttpCache` instance wrapping the kernel in `public/index.php`.
**Code Snippet:**
```php
use Symfony\Bundle\FrameworkBundle\HttpCache\HttpCache;
$kernel = new Kernel('prod', false);
$cache  = new HttpCache($kernel);
```

---

**Q: What is the difference between Symfony's `HttpCache` and a dedicated reverse proxy like Varnish or Nginx?**
**A:** Both implement the HTTP caching spec. `HttpCache` is easier to set up (pure PHP, no extra infrastructure). Varnish/Nginx are faster (C-based, production grade). Use `HttpCache` for development/simple apps; Varnish for high-traffic production.
**Code Snippet:** N/A

---

**Q: What does the `debug: true` option do when passed to `HttpCache`?**
**A:** Adds `X-Symfony-Cache` headers to responses, showing whether the cache was a HIT, MISS, or STALE. Invaluable for debugging caching behavior.
**Code Snippet:**
```php
$cache = new HttpCache($kernel, new Store(__DIR__.'/../var/cache'), null, ['debug' => true]);
// Response header: X-Symfony-Cache: GET /products: miss, store
```

---

**Q: What is the `Store` class used with `HttpCache`?**
**A:** Persists cached responses to the filesystem. It is the first argument after the kernel in the `HttpCache` constructor.
**Code Snippet:**
```php
use Symfony\Component\HttpKernel\HttpCache\Store;
$cache = new HttpCache($kernel, new Store(__DIR__.'/../var/cache'));
```

---

### Cache types

**Q: What are the two main types of HTTP caches?**
**A:**
1. **Expiration-based caching** — cache the response until it expires. No server contact until then.
2. **Validation-based caching** — cache stores the response, but checks with the server on each request to see if it has changed. Server can respond with `304 Not Modified`.
**Code Snippet:** N/A

---

**Q: What are the two categories of HTTP cache by location?**
**A:**
1. **Private (browser) cache** — only for one user. Set with `Cache-Control: private`.
2. **Shared (proxy/CDN) cache** — for all users. Set with `Cache-Control: public`.
**Code Snippet:**
```php
$response->setPublic();   // Cache-Control: public — shared caches can cache
$response->setPrivate();  // Cache-Control: private — only browser caches
```

---

**Q: What does it mean for a response to be "cacheable"?**
**A:** A response is cacheable if: the status code is 200, 203, 204, 206, 300, 301, 404, 405, or 410; it has a `Cache-Control`, `Expires`, or `Last-Modified` header; the method is `GET` or `HEAD`.
**Code Snippet:** N/A

---

### Expiration (headers)

**Q: What HTTP headers are used to control cache expiration?**
**A:** `Cache-Control: max-age=N` (preferred, relative) and `Expires: <date>` (absolute, legacy). `max-age` takes precedence over `Expires`.
**Code Snippet:**
```php
$response->setMaxAge(3600);             // Cache-Control: max-age=3600
$response->setSharedMaxAge(3600);       // Cache-Control: public, s-maxage=3600
$response->setExpires(new \DateTime('+1 hour')); // Expires: header
```

---

**Q: What is the difference between `max-age` and `s-maxage`?**
**A:** `max-age` applies to **all caches** (browser + shared). `s-maxage` applies **only to shared caches** (proxies, CDNs), overriding `max-age` for them. Browsers still use `max-age`.
**Code Snippet:**
```php
$response->setMaxAge(60);           // browser cache: 60s
$response->setSharedMaxAge(3600);   // proxy/CDN cache: 1h
// Result: Cache-Control: max-age=60, public, s-maxage=3600
```

---

**Q: What does `Cache-Control: no-store` mean?**
**A:** The response must **never** be cached — not in browser, not in shared cache. Used for sensitive data (bank account pages, personalized responses).
**Code Snippet:**
```php
$response->headers->set('Cache-Control', 'no-store, private');
```

---

**Q: What does `Cache-Control: no-cache` mean (it is NOT "no caching")?**
**A:** The response CAN be cached, but the cache must **revalidate with the origin server before using** the cached copy. It does NOT mean "don't cache."
**Code Snippet:**
```php
$response->headers->set('Cache-Control', 'no-cache, must-revalidate');
```

---

**Q: What does `must-revalidate` do in `Cache-Control`?**
**A:** Tells caches that they **must** check with the origin server for stale responses. They cannot serve stale content even if the client explicitly allows it.
**Code Snippet:**
```php
$response->headers->set('Cache-Control', 'public, max-age=3600, must-revalidate');
```

---

**Q: How do you make a route non-cacheable in Symfony?**
**A:** Set `Cache-Control: no-store` (or `no-cache`). Symfony does this by default for `POST`, `PUT`, `PATCH`, `DELETE` responses.
**Code Snippet:**
```php
$response = $this->render('dashboard.html.twig');
$response->headers->set('Cache-Control', 'private, no-store');
return $response;
```

---

### Symfony Response cache methods

**Q: What does `$response->setMaxAge(seconds)` set?**
**A:** Sets `Cache-Control: max-age=N`. The response is fresh for N seconds from the time it was generated.
**Code Snippet:**
```php
$response->setMaxAge(3600); // fresh for 1 hour
```

---

**Q: What does `$response->setTtl(seconds)` set?**
**A:** An alias for `setSharedMaxAge()` via the `Age` header calculation. Sets the time remaining that a shared cache should consider the response fresh.
**Code Snippet:**
```php
$response->setTtl(600); // 10 minutes of shared freshness
```

---

**Q: What does `$response->expire()` do?**
**A:** Marks the response as expired immediately by setting `Expires` to a past date. Causes caches to consider it stale.
**Code Snippet:**
```php
$response->expire(); // Sets Expires: <past date>
```

---

### Validation (Etag, Last-Modified)

**Q: What is HTTP cache validation and what problem does it solve?**
**A:** After the cache TTL expires, rather than fetching the full response again, the client sends a conditional request. If the content hasn't changed, the server returns `304 Not Modified` (no body) — saving bandwidth.
**Code Snippet:** N/A

---

**Q: What HTTP response header is used for ETag-based validation?**
**A:** `ETag: "some-hash-value"`. On the next request, the client sends `If-None-Match: "some-hash-value"`. If the ETag still matches → `304 Not Modified`.
**Code Snippet:**
```php
$response->setEtag(md5($content));
$response->setPublic();
if ($response->isNotModified($request)) {
    return $response; // 304, no content sent
}
$response->setContent($content);
return $response;
```

---

**Q: What HTTP response header is used for Last-Modified validation?**
**A:** `Last-Modified: <date>`. Client sends `If-Modified-Since: <date>`. If not modified → `304 Not Modified`.
**Code Snippet:**
```php
$response->setLastModified($product->getUpdatedAt());
if ($response->isNotModified($request)) {
    return $response; // 304
}
$response->setContent($this->render('product/show.html.twig', ['product' => $product]));
return $response;
```

---

**Q: What does `$response->isNotModified($request)` do?**
**A:** Evaluates the request's `If-None-Match` and `If-Modified-Since` headers against the response's `ETag` and `Last-Modified`. If they match (no change), it sets the response status to `304` and removes the body. Returns `true` if not modified.
**Code Snippet:**
```php
$response->setEtag(md5(serialize($data)));
$response->setLastModified(new \DateTime($lastUpdateDate));
if ($response->isNotModified($request)) {
    return $response; // 304 — client has fresh copy
}
// Build the full response...
```

---

**Q: Should you set both `ETag` and `Last-Modified` on a response?**
**A:** Yes — setting both is the most robust approach. Clients and proxies can use whichever they prefer. `ETag` is more precise (content-based); `Last-Modified` is timestamp-based.
**Code Snippet:** N/A

---

**Q: What are "strong" vs "weak" ETags?**
**A:** A **strong** ETag (`"abc123"`) means exact byte-for-byte equality. A **weak** ETag (`W/"abc123"`) means semantically equivalent but possibly not byte-identical (e.g., different whitespace). Symfony generates strong ETags by default.
**Code Snippet:**
```php
$response->setEtag(md5($content));           // strong: "hash"
$response->setEtag(md5($content), true);     // weak:   W/"hash"
```

---

### Client-side caching

**Q: What is "client-side caching" vs "server-side caching" in HTTP context?**
**A:** **Client-side** = browser caches the response using `Cache-Control` / `Expires`. **Server-side** = a reverse proxy (Symfony `HttpCache`, Varnish) in front of the app caches and serves responses.
**Code Snippet:** N/A

---

**Q: What headers should you set to prevent sensitive pages from being cached anywhere?**
**A:** `Cache-Control: private, no-store`. Use `private` to prevent shared caches; `no-store` tells even the browser not to persist.
**Code Snippet:**
```php
$response->setPrivate();
$response->headers->addCacheControlDirective('no-store');
```

---

**Q: What is the `Vary` header and why is it important for caching?**
**A:** Tells caches that the response varies by one or more request headers. A separate cached copy is stored per distinct value of those headers — preventing serving the wrong cached version.
**Code Snippet:**
```php
$response->setVary('Accept-Encoding');            // different for gzip vs not
$response->setVary(['Accept', 'Accept-Language']); // different per format AND locale
```

---

### Server-side caching

**Q: How does the Symfony `HttpCache` store determine if it has a fresh response?**
**A:** It checks the `Cache-Control: max-age` / `s-maxage` against the stored response time + `Age` header. If still within the TTL, it serves the stored response without calling the app.
**Code Snippet:** N/A

---

**Q: What HTTP status does `HttpCache` return when it serves a cached response?**
**A:** `200 OK` (same as the original) plus an `X-Symfony-Cache: HIT` header (when debug is enabled). The age can be seen in the `Age: N` header (seconds since caching).
**Code Snippet:** N/A

---

**Q: What is cache "purging" and how does Symfony support it?**
**A:** Purging removes a specific cache entry before its TTL expires. Symfony's `HttpCache` supports purge via HTTP `PURGE` or `BAN` methods on trusted IPs, or via the `Store::purgeTags()` API (tag-based invalidation).
**Code Snippet:**
```php
// Purge a URL from Symfony HttpCache programmatically:
$httpClient->request('PURGE', '/products/42');
```

---

**Q: What is the `stale-while-revalidate` Cache-Control directive and what benefit does it provide?**
**A:** While revalidating a stale cached response in the background, caches can serve the stale version immediately. Prevents latency spikes on cache expiry. Supported by most CDNs.
**Code Snippet:**
```php
$response->headers->set(
    'Cache-Control',
    'public, max-age=60, stale-while-revalidate=30'
);
```

---
