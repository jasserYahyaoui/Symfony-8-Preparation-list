## Object Oriented Programming - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create a service class.

```bash
mkdir -p src/Service/PhpTopic
touch src/Service/PhpTopic/ProductService.php
```

**Step 2:** Place it in `src/Service/PhpTopic/ProductService.php`.

**Step 3:** Paste the following complete code:

```php
<?php

namespace App\Service\PhpTopic;

class Product
{
    public function __construct(
        public readonly string $name,
        public readonly float $price,
        private bool $active = true,
    ) {}

    public function isActive(): bool
    {
        return $this->active;
    }

    public function deactivate(): static
    {
        $clone = clone $this;
        // Readonly properties can be modified in clone context (PHP 8.3+)
        $clone->active = false;
        return $clone;
    }
}

class DiscountedProduct extends Product
{
    public function __construct(
        string $name,
        float $price,
        public readonly float $discount,
        bool $active = true,
    ) {
        parent::__construct($name, $price, $active);
    }

    public function getFinalPrice(): float
    {
        return $this->price * (1 - $this->discount);
    }
}

class ProductService
{
    /** @return Product[] */
    public function getProducts(): array
    {
        return [
            new Product('Keyboard', 49.99),
            new Product('Mouse', 29.99),
            new DiscountedProduct('Monitor', 299.99, 0.10),
        ];
    }

    /** @return array<string, mixed> */
    public function getProductSummary(): array
    {
        $products = $this->getProducts();

        return [
            'total_products' => count($products),
            'products' => array_map(fn(Product $p) => [
                'name' => $p->name,
                'price' => $p->price,
                'active' => $p->isActive(),
                'final_price' => $p instanceof DiscountedProduct
                    ? $p->getFinalPrice()
                    : $p->price,
            ], $products),
        ];
    }
}
```

**Step 4:** Create a controller to expose it:

```bash
touch src/Controller/PhpTopic/OopController.php
```

```php
<?php

namespace App\Controller\PhpTopic;

use App\Service\PhpTopic\ProductService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class OopController extends AbstractController
{
    #[Route('/php/oop-demo', name: 'php_oop_demo', methods: ['GET'])]
    public function index(ProductService $productService): JsonResponse
    {
        return $this->json($productService->getProductSummary());
    }
}
```

**Step 4:** Test it:

```bash
curl https://127.0.0.1:8000/php/oop-demo
```


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Object Oriented Programming"](https://symfonycasts.com/search?q=object%2Boriented%2Bprogramming)
