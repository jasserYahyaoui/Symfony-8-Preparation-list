## HttpKernel component and FrameworkBundle - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create the controller.

```bash
touch src/Controller/ControllersTopic/HttpKernelController.php
```

**Step 3:**

```php
<?php

namespace App\Controller\ControllersTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/controllers')]
class HttpKernelController extends AbstractController
{
    #[Route('/httpkernel-demo', name: 'ctrl_httpkernel', methods: ['GET'])]
    public function index(Request $request): JsonResponse
    {
        return $this->json([
            'resolved_controller' => $request->attributes->get('_controller'),
            'resolved_route' => $request->attributes->get('_route'),
            'httpkernel_role' => [
                'ControllerResolver' => 'Determines which controller to call from _controller attribute',
                'ArgumentResolver' => 'Resolves the arguments to pass to the controller method',
                'EventDispatcher' => 'Fires kernel events at each lifecycle step',
            ],
        ]);
    }
}
```

**Step 4:** Test: `curl https://127.0.0.1:8000/controllers/httpkernel-demo`


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "HttpKernel component and FrameworkBundle"](https://symfonycasts.com/search?q=httpkernel%2Bcomponent%2Band%2Bframeworkbundle)
