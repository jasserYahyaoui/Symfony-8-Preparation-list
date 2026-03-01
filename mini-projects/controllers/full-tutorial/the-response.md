## The response - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Controller/ControllersTopic/ResponseDemoController.php
```

```php
<?php

namespace App\Controller\ControllersTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/controllers')]
class ResponseDemoController extends AbstractController
{
    #[Route('/response-types', name: 'ctrl_response_types', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->json([
            'response_classes' => [
                'Response' => 'Base class for all HTTP responses',
                'JsonResponse' => 'JSON content with proper headers',
                'RedirectResponse' => 'HTTP redirect (301/302)',
                'BinaryFileResponse' => 'Serve a file for download',
                'StreamedResponse' => 'Stream content chunk by chunk',
                'StreamedJsonResponse' => 'Stream JSON for large datasets',
            ],
        ]);
    }

    #[Route('/custom-response', name: 'ctrl_custom_response', methods: ['GET'])]
    public function customResponse(): Response
    {
        $response = new Response();
        $response->setContent('Custom plain text response');
        $response->setStatusCode(Response::HTTP_OK);
        $response->headers->set('Content-Type', 'text/plain');
        $response->headers->set('X-Custom', 'Symfony-8');

        return $response;
    }
}
```

**Step 4:** Test: `curl -i https://127.0.0.1:8000/controllers/custom-response`


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "The response"](https://symfonycasts.com/search?q=the%2Bresponse)
