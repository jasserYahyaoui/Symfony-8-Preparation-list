## Abstract classes - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create an abstract base handler and two concrete implementations.

```bash
mkdir -p src/Service/PhpTopic/Handler
touch src/Service/PhpTopic/Handler/AbstractDataHandler.php
touch src/Service/PhpTopic/Handler/CsvHandler.php
touch src/Service/PhpTopic/Handler/JsonHandler.php
touch src/Controller/PhpTopic/AbstractClassController.php
```

**Step 2:** Place in `src/Service/PhpTopic/Handler/`.

**Step 3:**

`src/Service/PhpTopic/Handler/AbstractDataHandler.php`:
```php
<?php

namespace App\Service\PhpTopic\Handler;

abstract class AbstractDataHandler
{
    // Non-abstract method: shared behavior
    public function handle(array $data): array
    {
        $validated = $this->validate($data);
        $formatted = $this->format($validated);

        return [
            'handler' => static::class,
            'format' => $this->getFormat(),
            'output' => $formatted,
        ];
    }

    // Abstract methods: MUST be implemented by subclasses
    abstract protected function format(array $data): string;

    abstract public function getFormat(): string;

    // Concrete method with default behavior (can be overridden)
    protected function validate(array $data): array
    {
        return array_filter($data, fn(mixed $item) => $item !== null);
    }
}
```

`src/Service/PhpTopic/Handler/JsonHandler.php`:
```php
<?php

namespace App\Service\PhpTopic\Handler;

class JsonHandler extends AbstractDataHandler
{
    protected function format(array $data): string
    {
        return json_encode($data, JSON_PRETTY_PRINT);
    }

    public function getFormat(): string
    {
        return 'json';
    }
}
```

`src/Service/PhpTopic/Handler/CsvHandler.php`:
```php
<?php

namespace App\Service\PhpTopic\Handler;

class CsvHandler extends AbstractDataHandler
{
    protected function format(array $data): string
    {
        return implode(',', $data);
    }

    public function getFormat(): string
    {
        return 'csv';
    }
}
```

`src/Controller/PhpTopic/AbstractClassController.php`:
```php
<?php

namespace App\Controller\PhpTopic;

use App\Service\PhpTopic\Handler\JsonHandler;
use App\Service\PhpTopic\Handler\CsvHandler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class AbstractClassController extends AbstractController
{
    #[Route('/php/abstract-demo', name: 'php_abstract_demo', methods: ['GET'])]
    public function index(JsonHandler $json, CsvHandler $csv): JsonResponse
    {
        $data = ['Alice', null, 'Bob', 'Charlie', null];

        return $this->json([
            'json_result' => $json->handle($data),
            'csv_result' => $csv->handle($data),
        ]);
    }
}
```

**Step 4:** Test it:

```bash
curl https://127.0.0.1:8000/php/abstract-demo
```


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Abstract classes"](https://symfonycasts.com/search?q=abstract%2Bclasses)
