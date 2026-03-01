## Service registration methods - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**YAML registration** (`config/services.yaml`):
```yaml
services:
    _defaults:
        autowire: true
        autoconfigure: true

    App\:
        resource: '../src/'
        exclude:
            - '../src/DependencyInjection/'
            - '../src/Entity/'
            - '../src/Kernel.php'

    # Manual registration with argument binding
    App\Service\DiTopic\PriceCalculator:
        arguments:
            $taxRate: 0.20  # Bind a scalar value
```

**Attribute registration** (PHP 8):
```php
use Symfony\Component\DependencyInjection\Attribute\Autoconfigure;

#[Autoconfigure(lazy: true, tags: ['app.calculator'])]
class PriceCalculator
{
    // ...
}
```

**Step 4:** Test: `php bin/console debug:container App\\Service\\DiTopic\\PriceCalculator`


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Service registration methods"](https://symfonycasts.com/search?q=service%2Bregistration%2Bmethods)
