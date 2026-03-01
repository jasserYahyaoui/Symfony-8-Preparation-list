## Symfony Flex - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Run these commands in your sandbox project (terminal only — no file creation needed).

```bash
# See what Flex aliases are available
composer recipes

# Install a component using its Flex alias
composer require logger

# Verify the recipe was applied
cat config/packages/monolog.yaml
```

**Step 2:** Create a controller that proves the auto-configuration worked.

```bash
touch src/Controller/ArchitectureTopic/FlexController.php
```

**Step 3:**

```php
<?php

namespace App\Controller\ArchitectureTopic;

use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/architecture')]
class FlexController extends AbstractController
{
    #[Route('/flex-demo', name: 'arch_flex_demo', methods: ['GET'])]
    public function index(LoggerInterface $logger): JsonResponse
    {
        // Logger was auto-configured by Flex recipe — no manual config needed
        $logger->info('Flex demo endpoint called!');

        return $this->json([
            'message' => 'Flex auto-configured the logger!',
            'logger_class' => get_class($logger),
            'flex_purpose' => [
                'Installs recipes automatically',
                'Creates config files (config/packages/*.yaml)',
                'Registers bundles in config/bundles.php',
                'Uses aliases (e.g., "logger" => "symfony/monolog-bundle")',
            ],
        ]);
    }
}
```

**Step 4:** Test it:

```bash
curl https://127.0.0.1:8000/architecture/flex-demo
# Check the log
tail -5 var/log/dev.log | grep "Flex demo"
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Symfony Flex"](https://symfonycasts.com/search?q=symfony%2Bflex)
