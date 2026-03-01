## HTTP Specification (RFC 9110) - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create the controller.

```bash
touch src/Controller/HttpTopic/HttpSpecController.php
```

**Step 2:** Place in `src/Controller/HttpTopic/HttpSpecController.php`.

**Step 3:**

```php
<?php

namespace App\Controller\HttpTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/http')]
class HttpSpecController extends AbstractController
{
    #[Route('/spec-demo', name: 'http_spec_demo', methods: ['GET'])]
    public function specDemo(Request $request): JsonResponse
    {
        return $this->json([
            // Request line components
            'method' => $request->getMethod(),           // GET
            'uri' => $request->getRequestUri(),           // /http/spec-demo
            'protocol_version' => $request->getProtocolVersion(), // HTTP/1.1

            // Key headers
            'host' => $request->getHost(),
            'user_agent' => $request->headers->get('User-Agent'),
            'accept' => $request->headers->get('Accept'),

            // Symfony's HttpFoundation abstraction
            'scheme' => $request->getScheme(),            // https
            'is_secure' => $request->isSecure(),
            'client_ip' => $request->getClientIp(),
            'path_info' => $request->getPathInfo(),
            'query_string' => $request->getQueryString(),
            'all_query_params' => $request->query->all(),
        ]);
    }
}
```

**Step 4:** Test it:

```bash
curl "https://127.0.0.1:8000/http/spec-demo?foo=bar&page=2"
```

Expected: JSON showing all the HTTP request components extracted via Symfony's `Request` object.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "HTTP Specification (RFC 9110)"](https://symfonycasts.com/search?q=http%2Bspecification%2B%28rfc%2B9110%29)
