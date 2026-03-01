## HTTP request - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create the controller.

```bash
touch src/Controller/HttpTopic/RequestController.php
```

**Step 2:** Place in `src/Controller/HttpTopic/RequestController.php`.

**Step 3:**

```php
<?php

namespace App\Controller\HttpTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/http')]
class RequestController extends AbstractController
{
    #[Route('/request-demo', name: 'http_request_demo', methods: ['GET', 'POST'])]
    public function requestDemo(Request $request): JsonResponse
    {
        return $this->json([
            // ParameterBag: query string (?key=value)
            'query_all' => $request->query->all(),
            'query_page' => $request->query->getInt('page', 1),

            // ParameterBag: POST body (form data)
            'request_all' => $request->request->all(),

            // HeaderBag
            'content_type' => $request->headers->get('Content-Type'),
            'accept' => $request->headers->get('Accept'),
            'has_auth' => $request->headers->has('Authorization'),

            // ServerBag
            'server_software' => $request->server->get('SERVER_SOFTWARE'),
            'remote_addr' => $request->server->get('REMOTE_ADDR'),

            // Convenience methods
            'is_xml_http' => $request->isXmlHttpRequest(),
            'preferred_format' => $request->getPreferredFormat(),
            'is_method_safe' => $request->isMethodSafe(),
            'is_method_cacheable' => $request->isMethodCacheable(),
        ]);
    }

    #[Route('/request-json', name: 'http_request_json', methods: ['POST'])]
    public function jsonRequest(Request $request): JsonResponse
    {
        // Reading JSON body
        $payload = $request->toArray(); // Decodes JSON body into array

        return $this->json([
            'received_payload' => $payload,
            'content_type' => $request->getContentTypeFormat(),
            'raw_content' => $request->getContent(),
        ]);
    }
}
```

**Step 4:** Test it:

```bash
# GET with query params
curl "https://127.0.0.1:8000/http/request-demo?page=3&sort=name"

# POST with JSON body
curl -X POST -H "Content-Type: application/json" \
     -d '{"name":"Jasser","role":"student"}' \
     https://127.0.0.1:8000/http/request-json
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "HTTP request"](https://symfonycasts.com/search?q=http%2Brequest)
