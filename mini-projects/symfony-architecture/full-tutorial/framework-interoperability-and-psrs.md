## Framework interoperability and PSRs - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create a controller demonstrating PSR compliance.

```bash
touch src/Controller/ArchitectureTopic/PsrController.php
```

**Step 2:** Place in `src/Controller/ArchitectureTopic/`.

**Step 3:**

```php
<?php

namespace App\Controller\ArchitectureTopic;

use Psr\Log\LoggerInterface;         // PSR-3
use Psr\Container\ContainerInterface; // PSR-11
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/architecture')]
class PsrController extends AbstractController
{
    #[Route('/psr-demo', name: 'arch_psr_demo', methods: ['GET'])]
    public function index(LoggerInterface $logger): JsonResponse
    {
        // PSR-3: LoggerInterface
        $logger->info('PSR demo accessed');

        // PSR-11: Container is available via AbstractController
        // (but best practice: inject specific services, not the container)

        return $this->json([
            'psrs_symphony_implements' => [
                'PSR-1' => 'Basic Coding Standard',
                'PSR-3' => 'Logger Interface (MonologBundle)',
                'PSR-4' => 'Autoloader (Composer autoload → App\\ → src/)',
                'PSR-6' => 'Caching Interface (Cache component)',
                'PSR-7' => 'HTTP Message Interface (via psr-http-message-bridge)',
                'PSR-11' => 'Container Interface (DI Container)',
                'PSR-12' => 'Extended Coding Style',
                'PSR-16' => 'Simple Cache Interface',
                'PSR-17' => 'HTTP Factories (via bridge)',
                'PSR-18' => 'HTTP Client (HttpClient component)',
            ],
            'psr4_autoload_mapping' => [
                'App\\' => 'src/',
                'App\\Tests\\' => 'tests/',
            ],
            'logger_implements_psr3' => $logger instanceof LoggerInterface,
        ]);
    }
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/architecture/psr-demo
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Framework interoperability and PSRs"](https://symfonycasts.com/search?q=framework%2Binteroperability%2Band%2Bpsrs)
