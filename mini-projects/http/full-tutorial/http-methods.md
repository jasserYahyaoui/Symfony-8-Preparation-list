## HTTP methods - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create a controller demonstrating all major HTTP methods on one resource.

```bash
touch src/Controller/HttpTopic/MethodController.php
```

**Step 2:** Place in `src/Controller/HttpTopic/MethodController.php`.

**Step 3:**

```php
<?php

namespace App\Controller\HttpTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/http/items')]
class MethodController extends AbstractController
{
    #[Route('', name: 'http_items_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        // GET = safe, idempotent, cacheable
        return $this->json([
            'method' => 'GET',
            'safe' => true,
            'idempotent' => true,
            'cacheable' => true,
            'items' => [
                ['id' => 1, 'name' => 'Item A'],
                ['id' => 2, 'name' => 'Item B'],
            ],
        ]);
    }

    #[Route('', name: 'http_items_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        // POST = not safe, not idempotent, not cacheable
        return $this->json([
            'method' => 'POST',
            'safe' => false,
            'idempotent' => false,
            'cacheable' => false,
            'created' => $request->toArray(),
        ], Response::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'http_items_replace', methods: ['PUT'])]
    public function replace(int $id, Request $request): JsonResponse
    {
        // PUT = not safe, idempotent, not cacheable
        return $this->json([
            'method' => 'PUT',
            'safe' => false,
            'idempotent' => true,
            'cacheable' => false,
            'replaced' => ['id' => $id, ...$request->toArray()],
        ]);
    }

    #[Route('/{id}', name: 'http_items_update', methods: ['PATCH'])]
    public function patch(int $id, Request $request): JsonResponse
    {
        // PATCH = not safe, not idempotent, not cacheable
        return $this->json([
            'method' => 'PATCH',
            'safe' => false,
            'idempotent' => false,
            'cacheable' => false,
            'patched_fields' => $request->toArray(),
        ]);
    }

    #[Route('/{id}', name: 'http_items_delete', methods: ['DELETE'])]
    public function delete(int $id): Response
    {
        // DELETE = not safe, idempotent, not cacheable
        return new Response(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/{id}', name: 'http_items_head', methods: ['HEAD'])]
    public function head(int $id): Response
    {
        // HEAD = same as GET but no body
        $response = new Response(null, Response::HTTP_OK);
        $response->headers->set('X-Item-Exists', 'true');
        $response->headers->set('Content-Length', '0');
        return $response;
    }

    #[Route('/{id}', name: 'http_items_options', methods: ['OPTIONS'])]
    public function options(int $id): Response
    {
        $response = new Response(null, Response::HTTP_NO_CONTENT);
        $response->headers->set('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
        return $response;
    }
}
```

**Step 4:** Test all methods:

```bash
curl https://127.0.0.1:8000/http/items
curl -X POST -H "Content-Type: application/json" -d '{"name":"New"}' https://127.0.0.1:8000/http/items
curl -X PUT -H "Content-Type: application/json" -d '{"name":"Updated"}' https://127.0.0.1:8000/http/items/1
curl -X PATCH -H "Content-Type: application/json" -d '{"name":"Patched"}' https://127.0.0.1:8000/http/items/1
curl -i -X DELETE https://127.0.0.1:8000/http/items/1
curl -I https://127.0.0.1:8000/http/items/1
curl -i -X OPTIONS https://127.0.0.1:8000/http/items/1
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "HTTP methods"](https://symfonycasts.com/search?q=http%2Bmethods)
