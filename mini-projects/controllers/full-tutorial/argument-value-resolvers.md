## Argument value resolvers - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
mkdir -p src/ValueResolver
touch src/ValueResolver/CurrentDateTimeResolver.php
```

```php
<?php

namespace App\ValueResolver;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsTargetedValueResolver;
use Symfony\Component\HttpKernel\Controller\ValueResolverInterface;
use Symfony\Component\HttpKernel\ControllerMetadata\ArgumentMetadata;

#[AsTargetedValueResolver('current_datetime')]
class CurrentDateTimeResolver implements ValueResolverInterface
{
    public function resolve(Request $request, ArgumentMetadata $argument): iterable
    {
        if ($argument->getType() !== \DateTimeImmutable::class) {
            return [];
        }

        yield new \DateTimeImmutable();
    }
}
```

Usage in a controller:

```php
use Symfony\Component\HttpKernel\Attribute\ValueResolver;

#[Route('/current-time', name: 'ctrl_current_time')]
public function currentTime(
    #[ValueResolver('current_datetime')] \DateTimeImmutable $now,
): JsonResponse {
    return $this->json(['current_time' => $now->format('Y-m-d H:i:s')]);
}
```

**Step 4:** Test: `curl https://127.0.0.1:8000/controllers/current-time`


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Argument value resolvers"](https://symfonycasts.com/search?q=argument%2Bvalue%2Bresolvers)
