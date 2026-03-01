## URLs generation - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create the controller.

```bash
touch src/Controller/RoutingTopic/UrlGenerationController.php
```

**Step 3:**

```php
<?php

namespace App\Controller\RoutingTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

#[Route('/routing')]
class UrlGenerationController extends AbstractController
{
    #[Route('/url-gen', name: 'routing_url_gen', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->json([
            // Relative URL (default)
            'relative' => $this->generateUrl('routing_product_show', ['id' => 42]),

            // Absolute URL
            'absolute' => $this->generateUrl('routing_product_show', ['id' => 42], UrlGeneratorInterface::ABSOLUTE_URL),

            // Network path (//host/path)
            'network_path' => $this->generateUrl('routing_product_show', ['id' => 42], UrlGeneratorInterface::NETWORK_PATH),

            // With extra parameters (become query string)
            'with_query' => $this->generateUrl('routing_listing', ['page' => 3, 'sort' => 'name']),
        ]);
    }
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/routing/url-gen
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "URLs generation"](https://symfonycasts.com/search?q=urls%2Bgeneration)
