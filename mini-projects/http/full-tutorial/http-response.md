## HTTP response - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create the controller.

```bash
touch src/Controller/HttpTopic/ResponseController.php
```

**Step 2:** Place in `src/Controller/HttpTopic/ResponseController.php`.

**Step 3:**

```php
<?php

namespace App\Controller\HttpTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/http')]
class ResponseController extends AbstractController
{
    #[Route('/response-basic', name: 'http_response_basic', methods: ['GET'])]
    public function basicResponse(): Response
    {
        $response = new Response(
            content: '<html><body><h1>Hello from a raw Response!</h1></body></html>',
            status: Response::HTTP_OK,
        );
        $response->headers->set('Content-Type', 'text/html');
        $response->headers->set('X-Custom-Header', 'Symfony-8-Training');

        return $response;
    }

    #[Route('/response-json', name: 'http_response_json', methods: ['GET'])]
    public function jsonResponse(): JsonResponse
    {
        // JsonResponse auto-sets Content-Type: application/json
        $response = new JsonResponse(
            data: ['message' => 'Hello JSON', 'timestamp' => time()],
            status: Response::HTTP_CREATED,
            headers: ['X-API-Version' => '1.0'],
        );

        return $response;
    }

    #[Route('/response-streamed', name: 'http_response_streamed', methods: ['GET'])]
    public function streamedResponse(): StreamedResponse
    {
        return new StreamedResponse(function () {
            for ($i = 1; $i <= 5; $i++) {
                echo "Line {$i}\n";
                flush();
                usleep(200_000); // 200ms delay
            }
        }, Response::HTTP_OK, ['Content-Type' => 'text/plain']);
    }

    #[Route('/response-no-content', name: 'http_response_no_content', methods: ['DELETE'])]
    public function noContent(): Response
    {
        // 204 No Content — standard response for successful DELETE
        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}
```

**Step 4:** Test it:

```bash
curl -i https://127.0.0.1:8000/http/response-basic
curl -i https://127.0.0.1:8000/http/response-json
curl https://127.0.0.1:8000/http/response-streamed
curl -i -X DELETE https://127.0.0.1:8000/http/response-no-content
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "HTTP response"](https://symfonycasts.com/search?q=http%2Bresponse)
