## Caching types (browser, proxies, reverse-proxies) - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Controller/CachingTopic/CachingTypesController.php
```

```php
<?php

namespace App\Controller\CachingTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/caching')]
class CachingTypesController extends AbstractController
{
    #[Route('/types', name: 'caching_types', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->json([
            'caching_layers' => [
                'browser' => [
                    'type' => 'Private cache',
                    'scope' => 'Single user',
                    'header' => 'Cache-Control: private, max-age=300',
                ],
                'proxy' => [
                    'type' => 'Shared cache',
                    'scope' => 'Multiple users (ISP, CDN)',
                    'header' => 'Cache-Control: public, s-maxage=600',
                ],
                'reverse_proxy' => [
                    'type' => 'Gateway cache',
                    'scope' => 'Application-level (Varnish, Symfony HttpCache)',
                    'header' => 'Cache-Control: public, s-maxage=3600',
                ],
            ],
        ]);
    }
}
```

**Step 4:** Test: `curl https://127.0.0.1:8000/caching/types`


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Caching types (browser, proxies, reverse-proxies)"](https://symfonycasts.com/search?q=caching%2Btypes%2B%28browser%2C%2Bproxies%2C%2Breverse-proxies%29)
