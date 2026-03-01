## Tags - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Service/DiTopic/FormatterInterface.php
touch src/Service/DiTopic/JsonFormatter.php
touch src/Service/DiTopic/CsvFormatter.php
touch src/Service/DiTopic/FormatterRegistry.php
```

`src/Service/DiTopic/FormatterInterface.php`:
```php
<?php

namespace App\Service\DiTopic;

use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;

#[AutoconfigureTag('app.formatter')]
interface FormatterInterface
{
    public function format(array $data): string;
    public function supports(string $type): bool;
}
```

`src/Service/DiTopic/FormatterRegistry.php`:
```php
<?php

namespace App\Service\DiTopic;

use Symfony\Component\DependencyInjection\Attribute\AutowireIterator;

class FormatterRegistry
{
    public function __construct(
        #[AutowireIterator('app.formatter')]
        private readonly iterable $formatters,
    ) {}

    public function format(string $type, array $data): string
    {
        foreach ($this->formatters as $formatter) {
            if ($formatter->supports($type)) {
                return $formatter->format($data);
            }
        }
        throw new \InvalidArgumentException("No formatter for type: {$type}");
    }

    public function getAvailableTypes(): array
    {
        $types = [];
        foreach ($this->formatters as $formatter) {
            $types[] = $formatter::class;
        }
        return $types;
    }
}
```

Implement `JsonFormatter` and `CsvFormatter` implementing `FormatterInterface`.

**Step 4:** Inject `FormatterRegistry` in a controller and test.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Tags"](https://symfonycasts.com/search?q=tags)
