## Restrict URL parameters - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create the controller.

```bash
touch src/Controller/RoutingTopic/ParameterController.php
```

**Step 3:**

```php
<?php

namespace App\Controller\RoutingTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Requirement\Requirement;

#[Route('/routing')]
class ParameterController extends AbstractController
{
    // Basic parameter with regex requirement
    #[Route('/products/{id}', name: 'routing_product_show', requirements: ['id' => '\d+'], methods: ['GET'])]
    public function showProduct(int $id): JsonResponse
    {
        return $this->json(['product_id' => $id, 'requirement' => '\d+ (digits only)']);
    }

    // Using Symfony's built-in Requirement enum
    #[Route('/users/{uuid}', name: 'routing_user_by_uuid', requirements: ['uuid' => Requirement::UUID_V4], methods: ['GET'])]
    public function showUser(string $uuid): JsonResponse
    {
        return $this->json(['user_uuid' => $uuid, 'requirement' => 'UUID v4']);
    }

    // Multiple parameters with requirements
    #[Route('/articles/{year}/{slug}', name: 'routing_article', requirements: ['year' => '\d{4}', 'slug' => '[a-z0-9\-]+'], methods: ['GET'])]
    public function showArticle(int $year, string $slug): JsonResponse
    {
        return $this->json(['year' => $year, 'slug' => $slug]);
    }

    // Inline requirement syntax (Symfony 6.1+)
    #[Route('/items/{id<\d+>}', name: 'routing_item_inline', methods: ['GET'])]
    public function inlineRequirement(int $id): JsonResponse
    {
        return $this->json(['item_id' => $id, 'syntax' => 'inline {id<\d+>}']);
    }
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/routing/products/42       # ✅ works
curl https://127.0.0.1:8000/routing/products/abc      # ❌ 404
curl https://127.0.0.1:8000/routing/articles/2026/my-article  # ✅ works
curl https://127.0.0.1:8000/routing/articles/99/test   # ❌ 404 (year needs 4 digits)
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Restrict URL parameters"](https://symfonycasts.com/search?q=restrict%2Burl%2Bparameters)
