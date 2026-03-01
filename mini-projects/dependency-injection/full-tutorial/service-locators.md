## Service locators - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
use Symfony\Component\DependencyInjection\Attribute\AutowireLocator;
use Psr\Container\ContainerInterface;

class ReportGenerator
{
    public function __construct(
        #[AutowireLocator(services: [
            'json' => JsonFormatter::class,
            'csv' => CsvFormatter::class,
        ])]
        private readonly ContainerInterface $formatters,
    ) {}

    public function generate(string $type, array $data): string
    {
        if (!$this->formatters->has($type)) {
            throw new \InvalidArgumentException("Unknown format: {$type}");
        }

        return $this->formatters->get($type)->format($data);
    }
}
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Service locators"](https://symfonycasts.com/search?q=service%2Blocators)
