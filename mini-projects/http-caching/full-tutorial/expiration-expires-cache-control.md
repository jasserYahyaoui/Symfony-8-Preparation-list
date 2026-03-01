## Expiration (Expires, Cache-Control) - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
#[Route('/expiration-demo', name: 'caching_expiration', methods: ['GET'])]
public function expirationDemo(): JsonResponse
{
    $response = $this->json([
        'data' => 'This response uses expiration-based caching',
        'generated_at' => date('Y-m-d H:i:s'),
    ]);

    // Method 1: Cache-Control
    $response->setPublic();
    $response->setMaxAge(60);        // Browser: 60 seconds
    $response->setSharedMaxAge(300); // Shared cache: 5 minutes

    // Method 2: Expires header (HTTP/1.0 compatibility)
    $response->setExpires(new \DateTimeImmutable('+5 minutes'));

    return $response;
}
```

**Step 4:** Test: `curl -i https://127.0.0.1:8000/caching/expiration-demo` — check `Cache-Control` and `Expires` headers.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Expiration (Expires, Cache-Control)"](https://symfonycasts.com/search?q=expiration%2B%28expires%2C%2Bcache-control%29)
