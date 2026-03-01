## Services aliases - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


In `config/services.yaml`:
```yaml
services:
    App\Service\DiTopic\FormatterInterface:
        alias: App\Service\DiTopic\JsonFormatter
```

Or with PHP attribute:
```php
use Symfony\Component\DependencyInjection\Attribute\AsAlias;

#[AsAlias(FormatterInterface::class)]
class JsonFormatter implements FormatterInterface
{
    // This implementation will be used when FormatterInterface is type-hinted
}
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Services aliases"](https://symfonycasts.com/search?q=services%2Baliases)
