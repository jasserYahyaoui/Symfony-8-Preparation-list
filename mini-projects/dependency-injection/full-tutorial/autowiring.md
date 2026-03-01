## Autowiring - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
mkdir -p src/Service/DiTopic
touch src/Service/DiTopic/PriceCalculator.php
touch src/Service/DiTopic/DiscountProvider.php
touch src/Controller/DiTopic/AutowiringController.php
```

`src/Service/DiTopic/DiscountProvider.php`:
```php
<?php

namespace App\Service\DiTopic;

class DiscountProvider
{
    public function getDiscount(string $customerType): float
    {
        return match ($customerType) {
            'vip' => 0.20,
            'regular' => 0.05,
            default => 0.0,
        };
    }
}
```

`src/Service/DiTopic/PriceCalculator.php`:
```php
<?php

namespace App\Service\DiTopic;

class PriceCalculator
{
    // Autowired! Symfony reads the type-hint and injects DiscountProvider automatically.
    public function __construct(
        private readonly DiscountProvider $discountProvider,
    ) {}

    public function calculate(float $price, string $customerType): array
    {
        $discount = $this->discountProvider->getDiscount($customerType);
        $finalPrice = $price * (1 - $discount);

        return [
            'original' => $price,
            'discount_rate' => $discount,
            'final_price' => round($finalPrice, 2),
        ];
    }
}
```

`src/Controller/DiTopic/AutowiringController.php`:
```php
<?php

namespace App\Controller\DiTopic;

use App\Service\DiTopic\PriceCalculator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/di')]
class AutowiringController extends AbstractController
{
    #[Route('/autowiring', name: 'di_autowiring', methods: ['GET'])]
    public function index(PriceCalculator $calculator): JsonResponse
    {
        return $this->json([
            'vip_price' => $calculator->calculate(100.0, 'vip'),
            'regular_price' => $calculator->calculate(100.0, 'regular'),
            'note' => 'PriceCalculator was autowired with DiscountProvider automatically!',
        ]);
    }
}
```

**Step 4:** Test: `curl https://127.0.0.1:8000/di/autowiring`


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Autowiring"](https://symfonycasts.com/search?q=autowiring)
