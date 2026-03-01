## Service container - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Controller/DiTopic/ContainerController.php
```

```php
<?php

namespace App\Controller\DiTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/di')]
class ContainerController extends AbstractController
{
    #[Route('/container-demo', name: 'di_container', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->json([
            'what_is_container' => 'A centralized registry of all services in the application',
            'commands' => [
                'debug:container' => 'List all services',
                'debug:container --show-private' => 'Include private services',
                'debug:container <service_id>' => 'Show details of a specific service',
                'debug:autowiring' => 'List all autowirable types',
            ],
        ]);
    }
}
```

**Step 4:** Test:

```bash
php bin/console debug:container | head -20
php bin/console debug:container --show-private | wc -l
php bin/console debug:autowiring | head -30
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Service container"](https://symfonycasts.com/search?q=service%2Bcontainer)
