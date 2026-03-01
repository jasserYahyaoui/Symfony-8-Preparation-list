## Service decoration - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Service/DiTopic/CachedDiscountProvider.php
```

```php
<?php

namespace App\Service\DiTopic;

use Symfony\Component\DependencyInjection\Attribute\AsDecorator;
use Symfony\Component\DependencyInjection\Attribute\AutowireDecorated;

#[AsDecorator(decorates: DiscountProvider::class)]
class CachedDiscountProvider extends DiscountProvider
{
    private array $cache = [];

    public function __construct(
        #[AutowireDecorated] private readonly DiscountProvider $inner,
    ) {}

    public function getDiscount(string $customerType): float
    {
        if (!isset($this->cache[$customerType])) {
            $this->cache[$customerType] = $this->inner->getDiscount($customerType);
        }

        return $this->cache[$customerType];
    }
}
```

Now everywhere `DiscountProvider` is injected, Symfony injects `CachedDiscountProvider` instead, which wraps the original.

**Step 4:** Test: `curl https://127.0.0.1:8000/di/autowiring` — same result, but now cached.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Service decoration"](https://symfonycasts.com/search?q=service%2Bdecoration)
