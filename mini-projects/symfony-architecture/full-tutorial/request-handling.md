## Request handling - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Examine the front controller:

```bash
cat public/index.php
```

**Step 2:** Create a controller that traces the request lifecycle.

```bash
touch src/Controller/ArchitectureTopic/RequestLifecycleController.php
```

**Step 3:**

```php
<?php

namespace App\Controller\ArchitectureTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/architecture')]
class RequestLifecycleController extends AbstractController
{
    #[Route('/lifecycle', name: 'arch_lifecycle', methods: ['GET'])]
    public function index(Request $request): JsonResponse
    {
        return $this->json([
            'lifecycle_steps' => [
                '1. public/index.php' => 'Front controller receives the HTTP request',
                '2. Kernel::boot()' => 'Boots the kernel, loads bundles, builds the container',
                '3. Kernel::handle($request)' => 'Dispatches the request through the HttpKernel',
                '4. kernel.request event' => 'RouterListener resolves the route',
                '5. kernel.controller event' => 'Controller is resolved and arguments are resolved',
                '6. Controller execution' => 'YOUR code runs here and returns a Response',
                '7. kernel.response event' => 'Response can be modified by listeners',
                '8. Kernel::terminate()' => 'Post-response cleanup (e.g., sending emails)',
            ],
            'current_request' => [
                'kernel_environment' => $this->getParameter('kernel.environment'),
                'kernel_debug' => $this->getParameter('kernel.debug'),
                'symfony_version' => Kernel::VERSION,
                'route' => $request->attributes->get('_route'),
                'controller' => $request->attributes->get('_controller'),
            ],
        ]);
    }
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/architecture/lifecycle
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Request handling"](https://symfonycasts.com/search?q=request%2Bhandling)
