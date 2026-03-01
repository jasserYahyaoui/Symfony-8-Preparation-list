## HTTP request - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create `/http/request-inspector` that extracts and returns: the `Accept-Language` header, the client IP, whether the request is secure (HTTPS), and ALL cookies.

**Hints:**
- `$request->headers->get('Accept-Language')`.
- `$request->getClientIp()`.
- `$request->isSecure()`.
- `$request->cookies->all()`.

**Testing:** `curl -H "Accept-Language: fr-FR" https://127.0.0.1:8000/http/request-inspector`.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/request-inspector', name: 'http_request_inspector', methods: ['GET'])]
public function inspector(Request $request): JsonResponse
{
    return $this->json([
        'accept_language' => $request->headers->get('Accept-Language'),
        'client_ip' => $request->getClientIp(),
        'is_secure' => $request->isSecure(),
        'cookies' => $request->cookies->all(),
        'preferred_language' => $request->getPreferredLanguage(['en', 'fr', 'de']),
    ]);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "HTTP request"](https://symfonycasts.com/search?q=http%2Brequest)
