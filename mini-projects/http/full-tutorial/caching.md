## Caching - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create the controller.

```bash
touch src/Controller/HttpTopic/CachingHeaderController.php
```

**Step 2:** Place in `src/Controller/HttpTopic/CachingHeaderController.php`.

**Step 3:**

```php
<?php

namespace App\Controller\HttpTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/http')]
class CachingHeaderController extends AbstractController
{
    #[Route('/cache-expiration', name: 'http_cache_expiration', methods: ['GET'])]
    public function expiration(): JsonResponse
    {
        $response = $this->json([
            'data' => 'This response is cached for 60 seconds',
            'generated_at' => date('H:i:s'),
        ]);

        // Expiration model: Cache-Control
        $response->setPublic();               // Can be cached by shared caches
        $response->setMaxAge(60);             // Cache for 60 seconds
        $response->setSharedMaxAge(120);      // CDN caches for 120 seconds
        // Also sets s-maxage=120

        return $response;
    }

    #[Route('/cache-validation', name: 'http_cache_validation', methods: ['GET'])]
    public function validation(Request $request): Response
    {
        // Simulate data with a known last-modified time
        $lastModified = new \DateTimeImmutable('2026-03-01 10:00:00');
        $etag = md5('my-data-v1');

        $response = new JsonResponse();

        // Validation model: ETag + Last-Modified
        $response->setEtag($etag);
        $response->setLastModified($lastModified);
        $response->setPublic();

        // Check if the client's cache is still valid
        if ($response->isNotModified($request)) {
            // Returns 304 Not Modified — no body transferred
            return $response;
        }

        $response->setData([
            'data' => 'Fresh data from server',
            'etag' => $etag,
            'last_modified' => $lastModified->format('r'),
        ]);

        return $response;
    }

    #[Route('/cache-private', name: 'http_cache_private', methods: ['GET'])]
    public function privateCache(): JsonResponse
    {
        $response = $this->json([
            'data' => 'User-specific data — should NOT be cached by shared caches',
        ]);

        $response->setPrivate();       // Only browser can cache
        $response->setMaxAge(300);     // Browser caches for 5 minutes

        return $response;
    }
}
```

**Step 4:** Test it:

```bash
# Check Cache-Control headers
curl -i https://127.0.0.1:8000/http/cache-expiration

# First request (200) + conditional request (304)
curl -i https://127.0.0.1:8000/http/cache-validation
ETAG=$(curl -sI https://127.0.0.1:8000/http/cache-validation | grep -i etag | awk '{print $2}' | tr -d '\r')
curl -i -H "If-None-Match: $ETAG" https://127.0.0.1:8000/http/cache-validation
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Caching"](https://symfonycasts.com/search?q=caching)
