## The base AbstractController class - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Controller/ControllersTopic/AbstractDemoController.php
```

```php
<?php

namespace App\Controller\ControllersTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/controllers')]
class AbstractDemoController extends AbstractController
{
    #[Route('/abstract-methods', name: 'ctrl_abstract_methods', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->json([
            'available_methods' => [
                'json()' => 'Returns a JsonResponse',
                'render()' => 'Renders a Twig template → Response',
                'renderView()' => 'Renders a Twig template → string',
                'redirectToRoute()' => 'Redirects to a named route',
                'redirect()' => 'Redirects to a URL',
                'createNotFoundException()' => 'Throws a 404 exception',
                'createAccessDeniedException()' => 'Throws a 403 exception',
                'addFlash()' => 'Adds a flash message to the session',
                'getUser()' => 'Returns the current authenticated user',
                'isGranted()' => 'Checks if user has a role/attribute',
                'denyAccessUnlessGranted()' => 'Throws 403 if not granted',
                'isCsrfTokenValid()' => 'Validates a CSRF token',
                'generateUrl()' => 'Generates a URL for a route',
                'getParameter()' => 'Gets a container parameter',
            ],
        ]);
    }
}
```

**Step 4:** Test: `curl https://127.0.0.1:8000/controllers/abstract-methods`


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "The base AbstractController class"](https://symfonycasts.com/search?q=the%2Bbase%2Babstractcontroller%2Bclass)
