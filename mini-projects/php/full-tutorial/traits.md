## Traits - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create a trait and a controller using it.

```bash
mkdir -p src/Trait
touch src/Trait/TimestampableTrait.php
touch src/Controller/PhpTopic/TraitController.php
```

**Step 2:** Place in `src/Trait/`.

**Step 3:**

`src/Trait/TimestampableTrait.php`:
```php
<?php

namespace App\Trait;

trait TimestampableTrait
{
    private ?\DateTimeImmutable $createdAt = null;
    private ?\DateTimeImmutable $updatedAt = null;

    public function initTimestamps(): void
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function touch(): void
    {
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getTimestamps(): array
    {
        return [
            'created_at' => $this->createdAt?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updatedAt?->format('Y-m-d H:i:s'),
        ];
    }
}
```

`src/Controller/PhpTopic/TraitController.php`:
```php
<?php

namespace App\Controller\PhpTopic;

use App\Trait\TimestampableTrait;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class TraitController extends AbstractController
{
    use TimestampableTrait;

    #[Route('/php/trait-demo', name: 'php_trait_demo', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $this->initTimestamps();

        // Simulate work...
        usleep(1000); // 1ms

        $this->touch();

        return $this->json([
            'message' => 'Trait methods are available on this controller',
            'timestamps' => $this->getTimestamps(),
            'uses_trait' => in_array(TimestampableTrait::class, class_uses(static::class)),
        ]);
    }
}
```

**Step 4:** Test it:

```bash
curl https://127.0.0.1:8000/php/trait-demo
```


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Traits"](https://symfonycasts.com/search?q=traits)
