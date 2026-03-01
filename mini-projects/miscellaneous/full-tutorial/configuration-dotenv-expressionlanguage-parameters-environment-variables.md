## Configuration (DotEnv, ExpressionLanguage, parameters, environment variables) - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Controller/MiscTopic/ConfigController.php
```

**Step 1:** Understand the `.env` file hierarchy:

```
.env                  # Default values (committed to VCS)
.env.local            # Local overrides (NOT committed)
.env.test             # Test environment defaults
.env.test.local       # Local test overrides
.env.prod             # Production defaults (committed)
.env.prod.local       # Production local (NOT committed)
```

**Step 2:** Add a custom env variable in `.env`:

```bash
echo 'APP_CONTACT_EMAIL=admin@certif-sandbox.test' >> .env
```

**Step 3:** Use it in a controller:

```php
<?php

namespace App\Controller\MiscTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/misc')]
class ConfigController extends AbstractController
{
    #[Route('/config', name: 'misc_config')]
    public function index(
        #[Autowire('%env(APP_CONTACT_EMAIL)%')] string $contactEmail,
        #[Autowire('%kernel.project_dir%')] string $projectDir,
        #[Autowire('%kernel.environment%')] string $env,
    ): JsonResponse {
        return $this->json([
            'contact_email' => $contactEmail,
            'project_dir' => $projectDir,
            'environment' => $env,
            'debug' => $this->getParameter('kernel.debug'),
            'dotenv_hierarchy' => [
                '.env' => 'Base defaults (committed)',
                '.env.local' => 'Local overrides (NOT committed)',
                '.env.<env>' => 'Environment-specific defaults',
                '.env.<env>.local' => 'Environment-specific local overrides',
            ],
        ]);
    }
}
```

**Step 4:** Test: `curl https://127.0.0.1:8000/misc/config`


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Configuration (DotEnv, ExpressionLanguage, parameters, environment variables)"](https://symfonycasts.com/search?q=configuration%2B%28dotenv%2C%2Bexpressionlanguage%2C%2Bparameters%2C%2Benvironment%2Bvariables%29)
