## Serializer component - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
composer require serializer
touch src/Controller/MiscTopic/SerializerController.php
```

```php
<?php

namespace App\Controller\MiscTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/misc')]
class SerializerController extends AbstractController
{
    #[Route('/serializer-demo', name: 'misc_serializer')]
    public function index(SerializerInterface $serializer): JsonResponse
    {
        $product = new \stdClass();
        $product->name = 'Keyboard';
        $product->price = 49.99;
        $product->tags = ['electronics', 'input'];

        // Serialize to JSON
        $json = $serializer->serialize($product, 'json');

        // Serialize to XML
        $xml = $serializer->serialize($product, 'xml');

        // Deserialize from JSON
        $deserialized = $serializer->deserialize(
            $json,
            \stdClass::class,
            'json'
        );

        return $this->json([
            'json' => $json,
            'xml' => $xml,
            'deserialized_name' => $deserialized->name,
        ]);
    }
}
```

**Step 4:** Test: `curl https://127.0.0.1:8000/misc/serializer-demo`


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Serializer component"](https://symfonycasts.com/search?q=serializer%2Bcomponent)
