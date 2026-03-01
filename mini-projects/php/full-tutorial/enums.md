## Enums - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create an enum and a controller.

```bash
mkdir -p src/Enum
touch src/Enum/OrderStatus.php
touch src/Controller/PhpTopic/EnumController.php
```

**Step 2:** Place in `src/Enum/`.

**Step 3:**

`src/Enum/OrderStatus.php`:
```php
<?php

namespace App\Enum;

enum OrderStatus: string
{
    case Pending = 'pending';
    case Processing = 'processing';
    case Shipped = 'shipped';
    case Delivered = 'delivered';
    case Cancelled = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::Pending => '⏳ Pending',
            self::Processing => '🔄 Processing',
            self::Shipped => '📦 Shipped',
            self::Delivered => '✅ Delivered',
            self::Cancelled => '❌ Cancelled',
        };
    }

    public function isFinal(): bool
    {
        return in_array($this, [self::Delivered, self::Cancelled], true);
    }

    /** @return self[] */
    public function allowedTransitions(): array
    {
        return match ($this) {
            self::Pending => [self::Processing, self::Cancelled],
            self::Processing => [self::Shipped, self::Cancelled],
            self::Shipped => [self::Delivered],
            self::Delivered, self::Cancelled => [],
        };
    }
}
```

`src/Controller/PhpTopic/EnumController.php`:
```php
<?php

namespace App\Controller\PhpTopic;

use App\Enum\OrderStatus;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class EnumController extends AbstractController
{
    #[Route('/php/enum-demo/{status}', name: 'php_enum_demo', methods: ['GET'])]
    public function index(string $status): JsonResponse
    {
        // BackedEnum::tryFrom() returns null instead of throwing
        $orderStatus = OrderStatus::tryFrom($status);

        if ($orderStatus === null) {
            return $this->json([
                'error' => "Invalid status: {$status}",
                'valid_values' => array_map(fn(OrderStatus $s) => $s->value, OrderStatus::cases()),
            ], 400);
        }

        return $this->json([
            'value' => $orderStatus->value,
            'name' => $orderStatus->name,
            'label' => $orderStatus->label(),
            'is_final' => $orderStatus->isFinal(),
            'allowed_transitions' => array_map(
                fn(OrderStatus $s) => $s->value,
                $orderStatus->allowedTransitions(),
            ),
            'all_cases' => array_map(fn(OrderStatus $s) => [
                'name' => $s->name,
                'value' => $s->value,
            ], OrderStatus::cases()),
        ]);
    }
}
```

**Step 4:** Test it:

```bash
curl https://127.0.0.1:8000/php/enum-demo/pending
curl https://127.0.0.1:8000/php/enum-demo/invalid
```


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Enums"](https://symfonycasts.com/search?q=enums)
