## Routing component and FrameworkBundle - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Inspect the routing configuration and debug tools.

```bash
# See how routes are loaded
cat config/routes.yaml

# See all registered routes
php bin/console debug:router

# Show the router service
php bin/console debug:container router
```

**Step 2:** Create the first routing controller.

```bash
touch src/Controller/RoutingTopic/RoutingBasicsController.php
```

**Step 3:**

```php
<?php

namespace App\Controller\RoutingTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\RouterInterface;

#[Route('/routing')]
class RoutingBasicsController extends AbstractController
{
    #[Route('/basics', name: 'routing_basics', methods: ['GET'])]
    public function index(RouterInterface $router): JsonResponse
    {
        // The RouterInterface gives access to the route collection
        $routeCollection = $router->getRouteCollection();

        return $this->json([
            'total_routes' => $routeCollection->count(),
            'router_class' => get_class($router),
            'routing_topic_routes' => array_keys(
                array_filter(
                    $routeCollection->all(),
                    fn($route) => str_starts_with($route->getPath(), '/routing')
                )
            ),
        ]);
    }
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/routing/basics
php bin/console debug:router | grep routing
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Routing component and FrameworkBundle"](https://symfonycasts.com/search?q=routing%2Bcomponent%2Band%2Bframeworkbundle)
