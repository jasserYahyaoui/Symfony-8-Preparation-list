## Validation (ETag, Last-Modified) - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

#[Route('/validation-demo', name: 'caching_validation', methods: ['GET'])]
public function validationDemo(Request $request): Response
{
    // Simulate data with a known version
    $data = ['title' => 'Caching Guide', 'version' => 3];
    $lastModified = new \DateTimeImmutable('2026-03-01 10:00:00');
    $etag = md5(json_encode($data));

    $response = new JsonResponse();
    $response->setEtag($etag);
    $response->setLastModified($lastModified);
    $response->setPublic();

    // Check if the client's cached version is still valid
    if ($response->isNotModified($request)) {
        // 304 Not Modified — no body sent, saves bandwidth
        return $response;
    }

    // Full response — only if data changed
    $response->setData($data);
    return $response;
}
```

**Step 4:** Test:

```bash
# First request → 200 OK
curl -i https://127.0.0.1:8000/caching/validation-demo

# Conditional request with ETag → 304 Not Modified
ETAG=$(curl -sI https://127.0.0.1:8000/caching/validation-demo | grep -i etag | awk '{print $2}' | tr -d '\r')
curl -i -H "If-None-Match: $ETAG" https://127.0.0.1:8000/caching/validation-demo

# Conditional request with Last-Modified → 304
curl -i -H "If-Modified-Since: Sun, 01 Mar 2026 10:00:00 GMT" https://127.0.0.1:8000/caching/validation-demo
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Validation (ETag, Last-Modified)"](https://symfonycasts.com/search?q=validation%2B%28etag%2C%2Blast-modified%29)
