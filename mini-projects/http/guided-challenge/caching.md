## Caching - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create `/http/cache-must-revalidate` that sets `Cache-Control: public, max-age=30, must-revalidate` and also sets a `Vary: Accept-Language` header.

**Hints:**
- `$response->setPublic()`, `$response->setMaxAge(30)`.
- `$response->headers->addCacheControlDirective('must-revalidate')`.
- `$response->setVary('Accept-Language')`.

**Testing:** `curl -i https://127.0.0.1:8000/http/cache-must-revalidate` — check headers.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/cache-must-revalidate', name: 'http_cache_must_revalidate', methods: ['GET'])]
public function mustRevalidate(): JsonResponse
{
    $response = $this->json(['data' => 'Must revalidate after 30s']);

    $response->setPublic();
    $response->setMaxAge(30);
    $response->headers->addCacheControlDirective('must-revalidate');
    $response->setVary('Accept-Language');

    return $response;
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Caching"](https://symfonycasts.com/search?q=caching)
