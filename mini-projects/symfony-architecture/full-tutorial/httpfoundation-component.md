## HttpFoundation component - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create the controller.

```bash
touch src/Controller/ArchitectureTopic/HttpFoundationController.php
```

**Step 2:** Place in `src/Controller/ArchitectureTopic/`.

**Step 3:**

```php
<?php

namespace App\Controller\ArchitectureTopic;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * NOTE: This controller does NOT extend AbstractController intentionally.
 * It demonstrates working with HttpFoundation directly.
 */
#[Route('/architecture')]
class HttpFoundationController
{
    #[Route('/httpfoundation-demo', name: 'arch_httpfoundation', methods: ['GET'])]
    public function index(Request $request): JsonResponse
    {
        // Create a Request from PHP globals (what Symfony does internally)
        // In a controller, the Request is already injected, but you can also do:
        // $request = Request::createFromGlobals();

        // ParameterBag demos
        $queryBag = $request->query;   // GET parameters
        $headerBag = $request->headers; // HTTP headers
        $serverBag = $request->server;  // $_SERVER

        return new JsonResponse([
            'request_class' => Request::class,
            'response_class' => Response::class,

            // ParameterBag methods
            'query.all()' => $queryBag->all(),
            'query.get(page, 1)' => $queryBag->get('page', '1'),
            'query.has(page)' => $queryBag->has('page'),
            'query.getInt(page, 1)' => $queryBag->getInt('page', 1),
            'query.count()' => $queryBag->count(),

            // HeaderBag methods
            'headers.get(Host)' => $headerBag->get('Host'),
            'headers.has(Authorization)' => $headerBag->has('Authorization'),

            // ServerBag
            'server.get(REQUEST_METHOD)' => $serverBag->get('REQUEST_METHOD'),

            // Request convenience
            'getClientIp()' => $request->getClientIp(),
            'getPathInfo()' => $request->getPathInfo(),
            'getSchemeAndHttpHost()' => $request->getSchemeAndHttpHost(),
        ]);
    }
}
```

**Step 4:** Test it:

```bash
curl "https://127.0.0.1:8000/architecture/httpfoundation-demo?page=5&sort=name"
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "HttpFoundation component"](https://symfonycasts.com/search?q=httpfoundation%2Bcomponent)
