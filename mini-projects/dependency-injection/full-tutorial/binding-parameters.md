## Binding parameters - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


In `config/services.yaml`:
```yaml
services:
    _defaults:
        autowire: true
        autoconfigure: true
        bind:
            $projectDir: '%kernel.project_dir%'
            $adminEmail: '%env(ADMIN_EMAIL)%'
            $defaultLocale: '%kernel.default_locale%'

    App\Service\DiTopic\PriceCalculator:
        arguments:
            $taxRate: 0.20
```

Usage in service:
```php
class PriceCalculator
{
    public function __construct(
        private readonly DiscountProvider $discountProvider,
        private readonly float $taxRate,         // Bound via services.yaml
        private readonly string $adminEmail,     // Bound via _defaults.bind
    ) {}
}
```

Or with `#[Autowire]` attribute:
```php
use Symfony\Component\DependencyInjection\Attribute\Autowire;

public function __construct(
    #[Autowire('%env(ADMIN_EMAIL)%')] private readonly string $adminEmail,
    #[Autowire('%kernel.project_dir%')] private readonly string $projectDir,
) {}
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Binding parameters"](https://symfonycasts.com/search?q=binding%2Bparameters)
