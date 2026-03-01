## PHP API up to PHP 8.4 version - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create a controller file manually.

```bash
touch src/Controller/PhpTopic/PhpApiController.php
```

**Step 2:** Place it in `src/Controller/PhpTopic/PhpApiController.php`.

**Step 3:** Paste the following complete code:

```php
<?php

namespace App\Controller\PhpTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/php')]
class PhpApiController extends AbstractController
{
    #[Route('/api-demo', name: 'php_api_demo', methods: ['GET'])]
    public function apiDemo(): JsonResponse
    {
        $products = [
            ['name' => 'Keyboard', 'price' => 49.99, 'inStock' => true],
            ['name' => 'Mouse', 'price' => 29.99, 'inStock' => false],
            ['name' => 'Monitor', 'price' => 299.99, 'inStock' => true],
            ['name' => 'Webcam', 'price' => 79.99, 'inStock' => true],
        ];

        // array_find: Find the first product over 100€
        $expensive = array_find($products, fn(array $p) => $p['price'] > 100);

        // array_find_key: Find the key of the first out-of-stock product
        $outOfStockKey = array_find_key($products, fn(array $p) => !$p['inStock']);

        // array_any: Check if ANY product costs more than 200€
        $hasExpensive = array_any($products, fn(array $p) => $p['price'] > 200);

        // array_all: Check if ALL products are in stock
        $allInStock = array_all($products, fn(array $p) => $p['inStock']);

        return $this->json([
            'first_over_100' => $expensive,
            'first_out_of_stock_key' => $outOfStockKey,
            'has_product_over_200' => $hasExpensive,
            'all_in_stock' => $allInStock,
        ]);
    }
}
```

**Step 4:** Test in the browser or terminal:

```bash
symfony server:start -d
curl https://127.0.0.1:8000/php/api-demo
```

Expected output:
```json
{
  "first_over_100": {"name": "Monitor", "price": 299.99, "inStock": true},
  "first_out_of_stock_key": 1,
  "has_product_over_200": true,
  "all_in_stock": false
}
```


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "PHP API up to PHP 8.4 version"](https://symfonycasts.com/search?q=php%2Bapi%2Bup%2Bto%2Bphp%2B8.4%2Bversion)
