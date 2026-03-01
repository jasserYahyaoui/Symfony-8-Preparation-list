# Quiz : HTTP Caching (Symfony 8.0 Certification)
> Exam-grade mock test — 30+ questions per sub-heading. ESI is OUT OF SCOPE.

---

### HttpCache component

**Question 1:** Symfony's `HttpCache` is:
**Type:** Single answer
- [ ] A) A JavaScript cache
- [ ] B) A reverse proxy cache written in PHP, implementing the HTTP caching RFC
- [ ] C) A database cache
- [ ] D) A Twig template cache

**Correct Answer(s):** B
**Explanation:** `HttpCache` sits in front of the Kernel and caches responses according to HTTP caching headers.

---

**Question 2:** `HttpCache` is typically used in:
**Type:** Single answer
- [ ] A) `config/packages/cache.yaml`
- [ ] B) `public/index.php` (wrapping the Kernel)
- [ ] C) `src/Controller/CacheController.php`
- [ ] D) `templates/cache.html.twig`

**Correct Answer(s):** B
**Explanation:** `$kernel = new HttpCache($kernel)` in the front controller.

---

### Expiration caching

**Question 3:** `Cache-Control: max-age=3600` means:
**Type:** Single answer
- [ ] A) The response is cached for 3600 days
- [ ] B) The response is fresh for 3600 seconds (1 hour) before revalidation
- [ ] C) The response must always be revalidated
- [ ] D) The response cannot be cached

**Correct Answer(s):** B
**Explanation:** `max-age` specifies the freshness lifetime in seconds.

---

**Question 4:** `$response->setMaxAge(3600)` sets:
**Type:** Single answer
- [ ] A) `Cache-Control: max-age=3600`
- [ ] B) `Expires` header
- [ ] C) `ETag` header
- [ ] D) `Vary` header

**Correct Answer(s):** A
**Explanation:** `setMaxAge()` sets the `max-age` directive in `Cache-Control`.

---

**Question 5:** `$response->setSharedMaxAge(3600)` sets:
**Type:** Single answer
- [ ] A) `max-age=3600`
- [ ] B) `s-maxage=3600` (for shared/reverse proxy caches)
- [ ] C) `no-cache`
- [ ] D) `private`

**Correct Answer(s):** B
**Explanation:** `s-maxage` applies to shared caches (CDN, Varnish, HttpCache). `max-age` applies to the browser.

---

**Question 6:** The `Expires` header uses:
**Type:** Single answer
- [ ] A) Seconds from now
- [ ] B) An absolute date/time (e.g., `Thu, 01 Jan 2026 00:00:00 GMT`)
- [ ] C) A relative time (e.g., `+1 hour`)
- [ ] D) A boolean

**Correct Answer(s):** B
**Explanation:** `Expires` uses an absolute HTTP date. `Cache-Control: max-age` supersedes it.

---

**Question 7:** `Cache-Control: no-store` means:
**Type:** Single answer
- [ ] A) Cacheable but must revalidate
- [ ] B) No cache storage at all — the response must never be cached
- [ ] C) Cache publicly
- [ ] D) Cache for 0 seconds

**Correct Answer(s):** B
**Explanation:** `no-store` prevents any caching. `no-cache` allows caching but requires revalidation every time.

---

**Question 8:** `Cache-Control: no-cache` means:
**Type:** Single answer
- [ ] A) Don't cache at all
- [ ] B) Cache the response, but always revalidate with the origin server before serving
- [ ] C) Cache publicly
- [ ] D) Cache indefinitely

**Correct Answer(s):** B
**Explanation:** `no-cache` ≠ "don't cache." It means "must revalidate." `no-store` means "don't cache."

---

### Validation caching

**Question 9:** Validation caching uses which headers? (Select all)
**Type:** Multiple choice
- [ ] A) `ETag`
- [ ] B) `Last-Modified`
- [ ] C) `If-None-Match`
- [ ] D) `If-Modified-Since`
- [ ] E) `max-age`

**Correct Answer(s):** A, B, C, D
**Explanation:** `ETag` + `If-None-Match` (strong/weak entity match), `Last-Modified` + `If-Modified-Since` (time-based). `max-age` is expiration, not validation.

---

**Question 10:** When the server returns `304 Not Modified`, it means:
**Type:** Single answer
- [ ] A) The resource was deleted
- [ ] B) The cached version is still valid — use it
- [ ] C) The resource has changed
- [ ] D) An error occurred

**Correct Answer(s):** B
**Explanation:** `304` = no body needed, cache is still fresh.

---

**Question 11:** An `ETag` is:
**Type:** Single answer
- [ ] A) A timestamp
- [ ] B) A unique identifier (usually a hash) for a specific version of a resource
- [ ] C) A URL
- [ ] D) A cookie

**Correct Answer(s):** B
**Explanation:** ETag = entity tag. Changes when the content changes. Client sends `If-None-Match: "etag"`.

---

**Question 12:** `$response->setEtag(md5($content))` sets:
**Type:** Single answer
- [ ] A) A strong ETag
- [ ] B) A Last-Modified header
- [ ] C) A Cache-Control directive
- [ ] D) A cookie

**Correct Answer(s):** A
**Explanation:** Sets the `ETag` header with a hash of the content.

---

**Question 13:** `$response->setLastModified($datetime)` sets:
**Type:** Single answer
- [ ] A) An ETag
- [ ] B) The `Last-Modified` header
- [ ] C) The `Expires` header
- [ ] D) The `max-age` directive

**Correct Answer(s):** B
**Explanation:** Sets `Last-Modified` to the `\DateTimeInterface` value.

---

**Question 14:** `$response->isNotModified($request)` returns `true` when:
**Type:** Single answer
- [ ] A) The request has no cache headers
- [ ] B) The cached version is still valid (ETags match or not modified since)
- [ ] C) The response is empty
- [ ] D) Always

**Correct Answer(s):** B
**Explanation:** Compares request's `If-None-Match`/`If-Modified-Since` with response's `ETag`/`Last-Modified`. If valid, sets 304.

---

### Vary header

**Question 15:** The `Vary` header tells caches:
**Type:** Single answer
- [ ] A) How long to cache
- [ ] B) Which request headers to use as cache key dimensions (e.g., `Accept-Encoding`, `Accept-Language`)
- [ ] C) The content type
- [ ] D) The ETag

**Correct Answer(s):** B
**Explanation:** `Vary: Accept-Encoding` = cache different versions for gzip vs non-gzip clients.

---

**Question 16:** `$response->setVary('Accept-Encoding')` means:
**Type:** Single answer
- [ ] A) The response varies by encoding — different cache entries per `Accept-Encoding` value
- [ ] B) The response is never cached
- [ ] C) The encoding is forced to gzip
- [ ] D) The response is private

**Correct Answer(s):** A
**Explanation:** Caches store separate entries for each unique `Accept-Encoding` value.

---

### Stale-while-revalidate

**Question 17:** `stale-while-revalidate=60` means:
**Type:** Single answer
- [ ] A) Return stale (expired) cached content while revalidating in the background, for up to 60 seconds past expiry
- [ ] B) Never return stale content
- [ ] C) Revalidate every 60 seconds
- [ ] D) Cache for 60 seconds

**Correct Answer(s):** A
**Explanation:** Allows serving stale content immediately while fetching a fresh copy asynchronously.

---

**Question 18:** `stale-if-error=86400` means:
**Type:** Single answer
- [ ] A) Return errors for 86400 seconds
- [ ] B) Serve stale content if the origin server returns an error, for up to 86400 seconds
- [ ] C) Cache errors for 1 day
- [ ] D) Retry every 86400 seconds

**Correct Answer(s):** B
**Explanation:** If the origin is down, serve the stale cached response for up to 1 day.

---

### Cache-Control directives summary

**Question 19:** Which `Cache-Control` directive is more restrictive: `private` or `public`?
**Type:** Single answer
- [ ] A) `private` — only the user's browser can cache
- [ ] B) `public` — more restrictive
- [ ] C) They are equally restrictive
- [ ] D) Neither is restrictive

**Correct Answer(s):** A
**Explanation:** `private` prevents shared caches (CDN, reverse proxy) from caching. `public` allows them.

---

**Question 20:** `#[Cache(maxage: 3600, public: true)]` attribute on a controller:
**Type:** Single answer
- [ ] A) Defines a route
- [ ] B) Automatically sets cache headers on the Response (`Cache-Control: public, max-age=3600`)
- [ ] C) Caches the controller in memory
- [ ] D) Creates a database cache

**Correct Answer(s):** B
**Explanation:** The `#[Cache]` attribute automatically adds HTTP caching headers to the response.

---

---
