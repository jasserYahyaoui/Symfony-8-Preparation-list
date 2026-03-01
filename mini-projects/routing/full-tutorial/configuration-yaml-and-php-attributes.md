## Configuration (YAML and PHP attributes) - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create a controller with attribute-based routes.

```bash
touch src/Controller/RoutingTopic/ConfigController.php
```

**Step 2:** Place in `src/Controller/RoutingTopic/`.

**Step 3:** PHP Attributes approach (recommended):

```php
<?php

namespace App\Controller\RoutingTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class ConfigController extends AbstractController
{
    // Basic route with attribute
    #[Route('/routing/config/attribute', name: 'routing_config_attr', methods: ['GET'])]
    public function attributeRoute(): JsonResponse
    {
        return $this->json(['source' => 'PHP Attribute', 'route_name' => 'routing_config_attr']);
    }

    // Route with multiple methods
    #[Route('/routing/config/multi-method', name: 'routing_config_multi', methods: ['GET', 'POST'])]
    public function multiMethod(): JsonResponse
    {
        return $this->json(['accepts' => 'GET and POST']);
    }
}
```

**Step 4:** YAML approach — add to `config/routes.yaml`:

```yaml
routing_config_yaml:
    path: /routing/config/yaml
    controller: App\Controller\RoutingTopic\ConfigController::yamlRoute
    methods: [GET]
```

Add the method to the controller:
```php
public function yamlRoute(): JsonResponse
{
    return $this->json(['source' => 'YAML config', 'route_name' => 'routing_config_yaml']);
}
```

**Step 5:** Test both:

```bash
curl https://127.0.0.1:8000/routing/config/attribute
curl https://127.0.0.1:8000/routing/config/yaml
php bin/console debug:router | grep routing_config
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Configuration (YAML and PHP attributes)"](https://symfonycasts.com/search?q=configuration%2B%28yaml%2Band%2Bphp%2Battributes%29)
