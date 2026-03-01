## Components and Bridges - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Run in terminal:

```bash
# List all installed Symfony packages
composer show "symfony/*" | head -30

# Show a Component
composer show symfony/http-foundation

# Show a Bundle
composer show symfony/framework-bundle

# Show a Bridge (if installed)
composer show symfony/twig-bridge 2>/dev/null || echo "Not installed (install with: composer require twig)"
```

**Step 2:** Create a demonstration controller.

```bash
touch src/Controller/ArchitectureTopic/ComponentsController.php
```

**Step 3:**

```php
<?php

namespace App\Controller\ArchitectureTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/architecture')]
class ComponentsController extends AbstractController
{
    #[Route('/components-demo', name: 'arch_components_demo', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->json([
            'components' => [
                'definition' => 'Standalone decoupled libraries (can be used without the framework)',
                'examples' => [
                    'symfony/http-foundation' => 'OOP wrapper for HTTP',
                    'symfony/routing' => 'URL matching and generation',
                    'symfony/event-dispatcher' => 'Observer pattern implementation',
                    'symfony/dependency-injection' => 'IoC container',
                    'symfony/console' => 'CLI application framework',
                ],
            ],
            'bundles' => [
                'definition' => 'Packages that integrate features INTO the Symfony framework',
                'examples' => [
                    'symfony/framework-bundle' => 'Core framework integration',
                    'symfony/security-bundle' => 'Security system integration',
                    'symfony/twig-bundle' => 'Twig templating integration',
                ],
            ],
            'bridges' => [
                'definition' => 'Adapters connecting Symfony to third-party libraries',
                'examples' => [
                    'symfony/twig-bridge' => 'Connects Twig to Symfony (form helpers, etc.)',
                    'symfony/psr-http-message-bridge' => 'PSR-7 HTTP message compatibility',
                    'symfony/doctrine-bridge' => 'Connects Doctrine ORM to Symfony',
                ],
            ],
        ]);
    }
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/architecture/components-demo
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Components and Bridges"](https://symfonycasts.com/search?q=components%2Band%2Bbridges)
