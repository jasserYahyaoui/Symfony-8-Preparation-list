## Client side caching - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
#[Route('/client-cache', name: 'caching_client', methods: ['GET'])]
public function clientCache(): JsonResponse
{
    $response = $this->json([
        'data' => 'Cached in the browser only',
        'timestamp' => time(),
    ]);

    $response->setPrivate();           // Only browser can cache (not CDN)
    $response->setMaxAge(300);         // 5 minutes
    $response->headers->addCacheControlDirective('must-revalidate');

    return $response;
}
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Client side caching"](https://symfonycasts.com/search?q=client%2Bside%2Bcaching)
