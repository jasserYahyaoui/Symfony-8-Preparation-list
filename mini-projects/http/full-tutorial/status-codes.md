## Status codes - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create a controller that demonstrates all status code families.

```bash
touch src/Controller/HttpTopic/StatusCodeController.php
```

**Step 2:** Place in `src/Controller/HttpTopic/StatusCodeController.php`.

**Step 3:**

```php
<?php

namespace App\Controller\HttpTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/http')]
class StatusCodeController extends AbstractController
{
    #[Route('/status/{code}', name: 'http_status_demo', methods: ['GET'])]
    public function statusDemo(int $code): JsonResponse
    {
        // Map common codes to their Symfony constant names
        $knownCodes = [
            200 => 'HTTP_OK',
            201 => 'HTTP_CREATED',
            204 => 'HTTP_NO_CONTENT',
            301 => 'HTTP_MOVED_PERMANENTLY',
            302 => 'HTTP_FOUND',
            304 => 'HTTP_NOT_MODIFIED',
            400 => 'HTTP_BAD_REQUEST',
            401 => 'HTTP_UNAUTHORIZED',
            403 => 'HTTP_FORBIDDEN',
            404 => 'HTTP_NOT_FOUND',
            405 => 'HTTP_METHOD_NOT_ALLOWED',
            409 => 'HTTP_CONFLICT',
            422 => 'HTTP_UNPROCESSABLE_ENTITY',
            429 => 'HTTP_TOO_MANY_REQUESTS',
            500 => 'HTTP_INTERNAL_SERVER_ERROR',
            502 => 'HTTP_BAD_GATEWAY',
            503 => 'HTTP_SERVICE_UNAVAILABLE',
        ];

        $family = match (true) {
            $code >= 100 && $code < 200 => '1xx Informational',
            $code >= 200 && $code < 300 => '2xx Success',
            $code >= 300 && $code < 400 => '3xx Redirection',
            $code >= 400 && $code < 500 => '4xx Client Error',
            $code >= 500 && $code < 600 => '5xx Server Error',
            default => 'Unknown',
        };

        return $this->json([
            'code' => $code,
            'family' => $family,
            'symfony_constant' => $knownCodes[$code] ?? 'N/A',
            'status_text' => Response::$statusTexts[$code] ?? 'Unknown Status',
        ], $code >= 200 && $code < 300 ? $code : 200); // Only return valid 2xx codes as actual status
    }

    #[Route('/status-showcase', name: 'http_status_showcase', methods: ['GET'])]
    public function showcase(): JsonResponse
    {
        return $this->json([
            'common_codes' => [
                '200 OK' => 'Standard successful response',
                '201 Created' => 'Resource was created (POST/PUT)',
                '204 No Content' => 'Success but no body to return',
                '301 Moved Permanently' => 'Permanent redirect (SEO)',
                '302 Found' => 'Temporary redirect',
                '304 Not Modified' => 'Cache validation passed',
                '400 Bad Request' => 'Malformed request from client',
                '401 Unauthorized' => 'Authentication required',
                '403 Forbidden' => 'Authenticated but not authorized',
                '404 Not Found' => 'Resource does not exist',
                '405 Method Not Allowed' => 'Wrong HTTP verb',
                '422 Unprocessable Entity' => 'Validation failed',
                '429 Too Many Requests' => 'Rate limit exceeded',
                '500 Internal Server Error' => 'Server-side failure',
                '503 Service Unavailable' => 'Server temporarily down',
            ],
        ]);
    }
}
```

**Step 4:** Test it:

```bash
curl https://127.0.0.1:8000/http/status/200
curl https://127.0.0.1:8000/http/status/404
curl https://127.0.0.1:8000/http/status-showcase
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Status codes"](https://symfonycasts.com/search?q=status%2Bcodes)
