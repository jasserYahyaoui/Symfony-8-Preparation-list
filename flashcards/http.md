# Flashcards : HTTP (Symfony 8.0)
> High-density deck — 5-15+ cards per sub-heading.
> ⚠️ HttpClient component is OUT OF SCOPE (archived in `deprecations/httpclient-component.md`).

---

### HTTP Specification (RFC 9110)

**Q: What are the four fundamental properties of HTTP as a protocol?**
**A:** (1) **Stateless** — no memory between requests. (2) **Text-based** headers. (3) **Request-response** cycle. (4) **Application-layer** protocol over TCP (or QUIC for HTTP/3).
**Code Snippet:** N/A

---

**Q: What does "stateless" mean in HTTP and what mechanism compensates for it?**
**A:** Each request carries all information needed — the server holds no per-connection state. Compensation: cookies, sessions, tokens.
**Code Snippet:** N/A

---

**Q: What is idempotency in HTTP and which methods are idempotent?**
**A:** Calling the same request N times has the same effect as calling it once. Idempotent: `GET`, `HEAD`, `PUT`, `DELETE`, `OPTIONS`. Non-idempotent: `POST`, `PATCH`.
**Code Snippet:** N/A

---

**Q: Which HTTP methods are "safe" and what does safe mean?**
**A:** `GET` and `HEAD` are safe — they do not modify server state. All safe methods are also idempotent.
**Code Snippet:** N/A

---

**Q: What is HTTP/2's key improvement over HTTP/1.1?**
**A:** **Multiplexing** — multiple requests share one TCP connection simultaneously. Also: header compression (HPACK) and server push.
**Code Snippet:** N/A

---

**Q: What is HTTP/3 and what transport does it use instead of TCP?**
**A:** HTTP/3 uses **QUIC** (a UDP-based protocol) for lower latency, especially on lossy networks. HTTP semantics are identical.
**Code Snippet:** N/A

---

### Status codes

**Q: What does the `1xx` family mean? Give one example.**
**A:** Informational — the request is being processed. `100 Continue` — server is ready to receive the body after `Expect: 100-continue`.
**Code Snippet:** N/A

---

**Q: What does `200 OK` vs `201 Created` vs `204 No Content` mean?**
**A:** `200` — success, body returned. `201` — resource created (include `Location` header). `204` — success, no body to return (e.g., DELETE).
**Code Snippet:**
```php
return new JsonResponse($resource, Response::HTTP_CREATED, ['Location' => '/api/products/'.$id]);
return new Response('', Response::HTTP_NO_CONTENT);
```

---

**Q: What is the difference between `301 Moved Permanently` and `302 Found`?**
**A:** `301` — permanently moved; browsers and crawlers update their records. `302` — temporary redirect; reuse the original URL in the future.
**Code Snippet:**
```php
return $this->redirectToRoute('new_home', [], 301); // permanent
return $this->redirectToRoute('new_home');           // 302 default
```

---

**Q: What is `304 Not Modified` and when does a server return it?**
**A:** Returned when a conditional request (`If-None-Match`/`If-Modified-Since`) confirms the resource hasn't changed. The client uses its cached copy. No body is sent.
**Code Snippet:**
```php
$response->setEtag(md5($content));
if ($response->isNotModified($request)) {
    return $response; // 304, no body
}
```

---

**Q: What is the precise difference between `401 Unauthorized` and `403 Forbidden`?**
**A:** `401` — not authenticated; a `WWW-Authenticate` header must be included. Logging in may help. `403` — authenticated but not authorized. No login will fix it.
**Code Snippet:** N/A

---

**Q: When should you return `422 Unprocessable Entity` vs `400 Bad Request`?**
**A:** `400` — malformed request (bad JSON syntax, missing required headers). `422` — well-formed request but semantically invalid (validation errors on correct JSON body).
**Code Snippet:** N/A

---

**Q: What is `429 Too Many Requests` and what header often accompanies it?**
**A:** Rate limit exceeded. Typically includes `Retry-After: N` (seconds) or `X-RateLimit-*` headers.
**Code Snippet:** N/A

---

**Q: What does `503 Service Unavailable` signal?**
**A:** The server is temporarily unable to handle requests (maintenance, overload). Often includes `Retry-After`.
**Code Snippet:** N/A

---

### HTTP request

**Q: What are the three structural parts of an HTTP request?**
**A:** (1) Request line (Method + URL + HTTP version), (2) Headers (key-value pairs), (3) Body (optional payload).
**Code Snippet:**
```text
POST /api/orders HTTP/1.1
Host: example.com
Content-Type: application/json

{"productId": 42, "qty": 1}
```

---

**Q: How does Symfony's `Request` object map to the PHP superglobals?**
**A:** `query` → `$_GET`, `request` → `$_POST`, `files` → `$_FILES`, `cookies` → `$_COOKIE`, `server` → `$_SERVER`, `headers` → HTTP_* entries from `$_SERVER`.
**Code Snippet:**
```php
$page  = $request->query->getInt('page', 1);
$name  = $request->request->getString('name');
$token = $request->headers->get('Authorization');
$routeId = $request->attributes->get('id');
```

---

**Q: How do you get the raw request body (e.g., JSON API request)?**
**A:** `$request->getContent()` returns the raw body string.
**Code Snippet:**
```php
$data = json_decode($request->getContent(), true);
```

---

**Q: What is the `X-HTTP-Method-Override` header and when is it needed?**
**A:** HTML forms only support `GET`/`POST`. To use `PUT`/`PATCH`/`DELETE`, submit a `POST` with a hidden `_method` field (or this header). Symfony reads it when `http_method_override: true`.
**Code Snippet:**
```html
<form method="POST">
    <input type="hidden" name="_method" value="DELETE">
</form>
```
```yaml
framework:
    http_method_override: true
```

---

**Q: Why should you use `$request->query->get()` instead of `$request->get()`?**
**A:** `$request->get()` searches query, POST body, AND attributes — the source is ambiguous and could introduce security issues. Always use the specific bag.
**Code Snippet:**
```php
// Explicit and safe:
$id   = $request->attributes->get('id');    // route param
$q    = $request->query->get('q');          // ?q=... URL param
$name = $request->request->get('name');     // POST body
```

---

**Q: What does `$request->isXmlHttpRequest()` check?**
**A:** Checks for the `X-Requested-With: XMLHttpRequest` header — set automatically by most JS libraries for AJAX requests.
**Code Snippet:**
```php
if ($request->isXmlHttpRequest()) {
    return $this->json($partialData);
}
```

---

**Q: How do you determine the client's IP address correctly when behind a reverse proxy?**
**A:** Configure trusted proxies in `framework.yaml`. Then `$request->getClientIp()` reads `X-Forwarded-For` properly.
**Code Snippet:**
```yaml
framework:
    trusted_proxies: '127.0.0.1,REMOTE_ADDR'
    trusted_headers: ['x-forwarded-for', 'x-forwarded-proto', 'x-forwarded-port']
```

---

### HTTP response

**Q: What are the three structural parts of an HTTP response?**
**A:** (1) Status line (HTTP version + code + phrase), (2) Headers, (3) Body.
**Code Snippet:**
```text
HTTP/1.1 200 OK
Content-Type: application/json

{"id": 1, "name": "Widget"}
```

---

**Q: What is the difference between `Content-Type` and `Accept` headers?**
**A:** `Content-Type` describes the format of the body **being sent** (request or response). `Accept` is sent by the client to specify formats it **can receive** in the response.
**Code Snippet:**
```text
Content-Type: application/json   ← "I am sending JSON"
Accept: application/json         ← "Please respond with JSON"
```

---

**Q: What are the four most used Symfony `Response` subclasses?**
**A:** `Response` (plaintext/HTML), `JsonResponse`, `RedirectResponse`, `BinaryFileResponse`.
**Code Snippet:**
```php
return new JsonResponse(['ok' => true], 201);
return new RedirectResponse('/new-url', 301);
return new BinaryFileResponse('/path/to/file.pdf');
```

---

**Q: How do you set a response header in Symfony?**
**A:** Via `$response->headers->set('Name', 'Value')`.
**Code Snippet:**
```php
$response->headers->set('X-Custom-Header', 'my-value');
$response->headers->set('Content-Language', 'fr');
```

---

**Q: What does `$response->setPublic()` vs `$response->setPrivate()` do?**
**A:** `setPublic()` → `Cache-Control: public` (shared caches may cache). `setPrivate()` → `Cache-Control: private` (browser-only cache).
**Code Snippet:**
```php
$response->setPublic()->setMaxAge(3600);   // shared CDN cache for 1h
$response->setPrivate()->setMaxAge(60);    // browser-only for 1min
```

---

**Q: What does `Response::HTTP_*` provide?**
**A:** Named constants for status codes, e.g., `HTTP_OK` (200), `HTTP_CREATED` (201), `HTTP_NO_CONTENT` (204), `HTTP_BAD_REQUEST` (400), `HTTP_UNAUTHORIZED` (401), `HTTP_FORBIDDEN` (403), `HTTP_NOT_FOUND` (404), `HTTP_UNPROCESSABLE_ENTITY` (422), `HTTP_TOO_MANY_REQUESTS` (429).
**Code Snippet:**
```php
return new Response('', Response::HTTP_NO_CONTENT);
```

---

### HTTP methods

**Q: What is the semantic difference between `PUT` and `PATCH`?**
**A:** `PUT` — replace the **entire resource**. `PATCH` — apply a **partial update** to the resource.
**Code Snippet:**
```php
#[Route('/users/{id}', methods: ['PUT'])]    // full replacement
#[Route('/users/{id}', methods: ['PATCH'])]  // partial update
```

---

**Q: What does the `OPTIONS` method return and why is it important for CORS?**
**A:** Returns the `Allow` header listing permitted methods. Browsers send a CORS pre-flight `OPTIONS` request before cross-origin `POST`/`PUT`/`DELETE` requests.
**Code Snippet:**
```text
OPTIONS /api/users HTTP/1.1
→ Allow: GET, POST, OPTIONS
→ Access-Control-Allow-Methods: GET, POST
```

---

**Q: What is a `HEAD` request and why is it useful?**
**A:** Same as `GET` but returns **only headers, no body**. Used to check resource existence, `Content-Length`, `Last-Modified` without downloading the full response.
**Code Snippet:** N/A

---

**Q: What methods are both safe AND idempotent?**
**A:** `GET`, `HEAD`, `OPTIONS`. All three do not modify state and can be repeated with identical results.
**Code Snippet:** N/A

---

### Cookies

**Q: What are the key security attributes for a Symfony cookie?**
**A:** `HttpOnly` (no JS access — XSS protection), `Secure` (HTTPS only), `SameSite` (CSRF protection: `Strict`, `Lax`, `None`).
**Code Snippet:**
```php
use Symfony\Component\HttpFoundation\Cookie;

$cookie = Cookie::create('auth_token')
    ->withValue('abc123')
    ->withHttpOnly(true)
    ->withSecure(true)
    ->withSameSite(Cookie::SAMESITE_STRICT)
    ->withExpires(new \DateTime('+30 days'));
$response->headers->setCookie($cookie);
```

---

**Q: What is the effect of `SameSite=Lax` vs `SameSite=Strict` vs `SameSite=None`?**
**A:** `Strict` — never sent cross-site (even clicking a link). `Lax` — sent for top-level navigations and safe methods only (safe default). `None` — always sent cross-site (requires `Secure`).
**Code Snippet:** N/A

---

**Q: How do you delete a cookie in Symfony?**
**A:** `$response->headers->clearCookie('name', $path, $domain)` — sets the cookie with a past expiry.
**Code Snippet:**
```php
$response->headers->clearCookie('auth_token');
$response->headers->clearCookie('session', '/', 'example.com');
```

---

**Q: How do you read an incoming cookie in Symfony?**
**A:** `$request->cookies->get('cookie_name', $default)`.
**Code Snippet:**
```php
$token = $request->cookies->get('auth_token');
$pref  = $request->cookies->get('theme', 'light');
```

---

**Q: Can a `SameSite=None` cookie be set without `Secure`?**
**A:** No. Modern browsers reject `SameSite=None` cookies that are not also `Secure`. This is a browser enforcement rule.
**Code Snippet:** N/A

---

### Content negotiation

**Q: What is content negotiation and which headers implement it?**
**A:** Client and server agree on the response format. Client sends `Accept` (format), `Accept-Language` (locale), `Accept-Encoding` (compression), `Accept-Charset` (charset). Server responds accordingly.
**Code Snippet:**
```text
GET /api/report
Accept: application/json, text/csv;q=0.8, */*;q=0.5
Accept-Language: fr-FR, fr;q=0.9, en;q=0.8
Accept-Encoding: gzip, deflate, br
```

---

**Q: What does the quality factor `q` mean in `Accept` headers?**
**A:** A preference weight from 0.0 to 1.0 (default 1.0). Higher = more preferred. `q=0` = not acceptable.
**Code Snippet:**
```text
Accept: text/html;q=1.0, application/json;q=0.9, */*;q=0.5
# Preference: HTML > JSON > anything else
```

---

**Q: What status code does a server return when it cannot satisfy any `Accept` format?**
**A:** `406 Not Acceptable`.
**Code Snippet:** N/A

---

**Q: How does Symfony help with format-based content negotiation in routes?**
**A:** Use the `{_format}` route parameter. It sets `$request->getRequestFormat()` automatically and can drive different response formats from one controller.
**Code Snippet:**
```php
#[Route('/data.{_format}', defaults: ['_format' => 'json'], requirements: ['_format' => 'json|xml|csv'])]
public function data(Request $request): Response {
    return match ($request->getRequestFormat()) {
        'csv'  => $this->csvResponse($data),
        'xml'  => $this->xmlResponse($data),
        default => $this->json($data),
    };
}
```

---

### Language detection

**Q: How does Symfony determine the locale from the HTTP request?**
**A:** Priority order: (1) `_locale` route parameter, (2) session locale (if set), (3) `Accept-Language` header parsed by `LocaleListener`, (4) `framework.default_locale`.
**Code Snippet:**
```php
// Highest priority: route param
#[Route('/{_locale}/home', requirements: ['_locale' => 'en|fr|de'])]
public function home(): Response { ... }
```

---

**Q: What Symfony subscriber handles locale detection automatically?**
**A:** `Symfony\Component\HttpKernel\EventListener\LocaleListener` — subscribed to `kernel.request`. It reads `_locale` from route attributes and calls `$request->setLocale()`.
**Code Snippet:** N/A

---

**Q: What is the `Accept-Language` header format with quality values?**
**A:** `Accept-Language: fr-FR, fr;q=0.9, en;q=0.8` — french France (preferred), generic French, English.
**Code Snippet:** N/A

---

**Q: How do you persist locale across multiple requests in a session-based app?**
**A:** Subscribe to `kernel.request`, read `_locale` from route or session, write it back to the session.
**Code Snippet:**
```php
public function onRequest(RequestEvent $event): void {
    $req = $event->getRequest();
    $locale = $req->attributes->get('_locale')
        ?? $req->getSession()->get('_locale', 'en');
    $req->setLocale($locale);
    $req->getSession()->set('_locale', $locale);
}
```

---

**Q: How does Twig use the current locale for translation?**
**A:** Uses `$request->getLocale()` (or `app.request.locale` in Twig). The `|trans` filter uses this locale to look up translations.
**Code Snippet:**
```twig
{{ 'greeting'|trans({}, 'messages', app.request.locale) }}
```

---
