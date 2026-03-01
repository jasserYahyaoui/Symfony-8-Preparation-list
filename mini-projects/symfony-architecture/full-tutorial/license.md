## License - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** No file to create — this is purely theoretical. Verify in the terminal:

```bash
composer show symfony/framework-bundle | grep -i license
```

**Step 2:** Create a quick reference endpoint.

```bash
touch src/Controller/ArchitectureTopic/LicenseController.php
```

**Step 3:**

```php
<?php

namespace App\Controller\ArchitectureTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/architecture')]
class LicenseController extends AbstractController
{
    #[Route('/license-info', name: 'arch_license_info', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->json([
            'symfony_version' => Kernel::VERSION,
            'license' => 'MIT',
            'key_points' => [
                'Permissive open-source license',
                'Can be used in commercial projects',
                'Can be modified and redistributed',
                'Must keep copyright notice',
                'No warranty provided',
            ],
        ]);
    }
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/architecture/license-info
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "License"](https://symfonycasts.com/search?q=license)
