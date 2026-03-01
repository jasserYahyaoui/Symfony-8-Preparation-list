## Official best practices - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create a "best practices showcase" service + controller.

```bash
mkdir -p src/Service/ArchitectureTopic
touch src/Service/ArchitectureTopic/GreetingService.php
touch src/Controller/ArchitectureTopic/BestPracticesController.php
```

**Step 2:** Place them appropriately.

**Step 3:**

`src/Service/ArchitectureTopic/GreetingService.php`:
```php
<?php

namespace App\Service\ArchitectureTopic;

/**
 * Best Practice: Business logic belongs in services, NOT in controllers.
 * Controllers should be "thin" — they delegate to services.
 */
class GreetingService
{
    public function greet(string $name, string $locale = 'en'): string
    {
        return match ($locale) {
            'fr' => "Bonjour, {$name} !",
            'de' => "Hallo, {$name}!",
            default => "Hello, {$name}!",
        };
    }
}
```

`src/Controller/ArchitectureTopic/BestPracticesController.php`:
```php
<?php

namespace App\Controller\ArchitectureTopic;

use App\Service\ArchitectureTopic\GreetingService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Best Practices demonstrated:
 * 1. Extend AbstractController (not Controller)
 * 2. Use PHP attributes for routing (not YAML)
 * 3. Use autowiring for dependency injection
 * 4. Keep controllers thin — delegate to services
 * 5. Use type hints everywhere
 */
#[Route('/architecture')]
class BestPracticesController extends AbstractController
{
    #[Route('/best-practices/{name}', name: 'arch_best_practices', methods: ['GET'])]
    public function index(
        string $name,
        GreetingService $greetingService, // Autowired
    ): JsonResponse {
        // Controller is "thin" — it just delegates and returns
        return $this->json([
            'greeting' => $greetingService->greet($name),
            'best_practices' => [
                'Use AbstractController',
                'Use PHP 8 attributes for routes',
                'Use autowiring for DI',
                'Put business logic in services',
                'Use the env() function for secrets',
                'Use ParamConverter for entity loading',
                'Use Voters for authorization logic',
            ],
        ]);
    }
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/architecture/best-practices/Jasser
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Official best practices"](https://symfonycasts.com/search?q=official%2Bbest%2Bpractices)
