## The session - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Controller/ControllersTopic/SessionController.php
```

```php
<?php

namespace App\Controller\ControllersTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/controllers')]
class SessionController extends AbstractController
{
    #[Route('/session-demo', name: 'ctrl_session', methods: ['GET'])]
    public function index(RequestStack $requestStack): JsonResponse
    {
        $session = $requestStack->getSession();

        // Store data
        $counter = $session->get('counter', 0) + 1;
        $session->set('counter', $counter);
        $session->set('last_visit', date('Y-m-d H:i:s'));

        return $this->json([
            'visit_counter' => $counter,
            'last_visit' => $session->get('last_visit'),
            'session_id' => $session->getId(),
            'all_session_data' => $session->all(),
        ]);
    }

    #[Route('/session-clear', name: 'ctrl_session_clear', methods: ['GET'])]
    public function clear(RequestStack $requestStack): JsonResponse
    {
        $requestStack->getSession()->clear();

        return $this->json(['message' => 'Session cleared']);
    }
}
```

**Step 4:** Test (use browser for sessions or `curl -c/-b` with cookies): Visit `/controllers/session-demo` multiple times — counter increments.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "The session"](https://symfonycasts.com/search?q=the%2Bsession)
