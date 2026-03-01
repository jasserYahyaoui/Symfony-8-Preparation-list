## Anonymous functions and closures - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create the controller.

```bash
touch src/Controller/PhpTopic/ClosureController.php
```

**Step 2:** Place in `src/Controller/PhpTopic/ClosureController.php`.

**Step 3:**

```php
<?php

namespace App\Controller\PhpTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class ClosureController extends AbstractController
{
    #[Route('/php/closure-demo', name: 'php_closure_demo', methods: ['GET'])]
    public function index(): JsonResponse
    {
        // 1. Classic anonymous function with `use`
        $multiplier = 3;
        $multiply = function (int $value) use ($multiplier): int {
            return $value * $multiplier;
        };

        // 2. Arrow function (PHP 7.4+): implicit capture by value
        $double = fn(int $n): int => $n * 2;

        // 3. Closure::fromCallable — wrap a method as a closure
        $formatter = \Closure::fromCallable([$this, 'formatPrice']);

        // 4. First-class callable syntax (PHP 8.1+)
        $firstClass = $this->formatPrice(...);

        $prices = [10.5, 20.0, 33.33];

        return $this->json([
            'multiplied' => array_map($multiply, [1, 2, 3, 4]),
            'doubled' => array_map($double, [5, 10, 15]),
            'formatted_fromCallable' => array_map($formatter, $prices),
            'formatted_firstClass' => array_map($firstClass, $prices),
        ]);
    }

    private function formatPrice(float $price): string
    {
        return number_format($price, 2, ',', ' ') . ' €';
    }
}
```

**Step 4:** Test it:

```bash
curl https://127.0.0.1:8000/php/closure-demo
```


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Anonymous functions and closures"](https://symfonycasts.com/search?q=anonymous%2Bfunctions%2Band%2Bclosures)
