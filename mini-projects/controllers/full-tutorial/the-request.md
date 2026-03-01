## The request - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Controller/ControllersTopic/RequestDemoController.php
```

```php
<?php

namespace App\Controller\ControllersTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/controllers')]
class RequestDemoController extends AbstractController
{
    #[Route('/request-access', name: 'ctrl_request', methods: ['GET', 'POST'])]
    public function index(Request $request): JsonResponse
    {
        return $this->json([
            'query_params' => $request->query->all(),
            'post_data' => $request->request->all(),
            'json_body' => $request->getContentTypeFormat() === 'json' ? $request->toArray() : null,
            'headers' => [
                'content_type' => $request->headers->get('Content-Type'),
                'accept' => $request->headers->get('Accept'),
            ],
            'method' => $request->getMethod(),
            'locale' => $request->getLocale(),
            'client_ip' => $request->getClientIp(),
            'is_ajax' => $request->isXmlHttpRequest(),
            'format' => $request->getRequestFormat(),
        ]);
    }
}
```

**Step 4:** Test: `curl "https://127.0.0.1:8000/controllers/request-access?key=value"`


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "The request"](https://symfonycasts.com/search?q=the%2Brequest)
