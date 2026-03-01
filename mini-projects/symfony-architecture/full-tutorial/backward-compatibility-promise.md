## Backward compatibility promise - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


This topic is purely theoretical. **Step 1:** Read the key concepts via a reference endpoint.

```bash
touch src/Controller/ArchitectureTopic/BcPromiseController.php
```

**Step 3:**

```php
<?php

namespace App\Controller\ArchitectureTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/architecture')]
class BcPromiseController extends AbstractController
{
    #[Route('/bc-promise', name: 'arch_bc_promise', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->json([
            'bc_promise' => [
                'scope' => 'Within a major version (e.g., 8.0 → 8.4), public APIs do NOT change',
                'what_is_stable' => [
                    'Public method signatures',
                    'Public class names',
                    'Configuration keys',
                    'Event names',
                ],
                'what_can_change' => [
                    'Internal/private APIs (marked @internal)',
                    'Experimental features (marked @experimental)',
                    'Between major versions (7.x → 8.0)',
                ],
                'deprecation_process' => [
                    '1. Feature is deprecated in version N.x with a notice',
                    '2. Deprecation notice shows the alternative',
                    '3. Feature is removed in version N+1.0',
                ],
            ],
        ]);
    }
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/architecture/bc-promise
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Backward compatibility promise"](https://symfonycasts.com/search?q=backward%2Bcompatibility%2Bpromise)
