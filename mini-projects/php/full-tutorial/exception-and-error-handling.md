## Exception and error handling - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create a custom exception and a controller that uses it.

```bash
mkdir -p src/Exception
touch src/Exception/ProductNotFoundException.php
touch src/Exception/InsufficientStockException.php
touch src/Controller/PhpTopic/ExceptionController.php
```

**Step 2:** Place in `src/Exception/`.

**Step 3:**

`src/Exception/ProductNotFoundException.php`:
```php
<?php

namespace App\Exception;

class ProductNotFoundException extends \RuntimeException
{
    public function __construct(string $productId)
    {
        parent::__construct(sprintf('Product "%s" not found.', $productId));
    }
}
```

`src/Exception/InsufficientStockException.php`:
```php
<?php

namespace App\Exception;

class InsufficientStockException extends \LogicException
{
    public function __construct(
        public readonly string $productId,
        public readonly int $requested,
        public readonly int $available,
    ) {
        parent::__construct(sprintf(
            'Insufficient stock for "%s": requested %d, available %d.',
            $productId, $requested, $available,
        ));
    }
}
```

`src/Controller/PhpTopic/ExceptionController.php`:
```php
<?php

namespace App\Controller\PhpTopic;

use App\Exception\ProductNotFoundException;
use App\Exception\InsufficientStockException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ExceptionController extends AbstractController
{
    #[Route('/php/exception-demo/{scenario}', name: 'php_exception_demo', methods: ['GET'])]
    public function index(string $scenario): JsonResponse
    {
        try {
            $result = match ($scenario) {
                'not-found' => throw new ProductNotFoundException('SKU-999'),
                'no-stock' => throw new InsufficientStockException('SKU-42', 10, 3),
                'ok' => ['message' => 'Everything is fine!'],
                default => throw new \InvalidArgumentException("Unknown scenario: {$scenario}"),
            };

            return $this->json(['status' => 'success', 'data' => $result]);

        } catch (ProductNotFoundException $e) {
            return $this->json(
                ['status' => 'error', 'type' => 'not_found', 'message' => $e->getMessage()],
                Response::HTTP_NOT_FOUND,
            );
        } catch (InsufficientStockException $e) {
            return $this->json(
                ['status' => 'error', 'type' => 'stock', 'detail' => [
                    'product' => $e->productId,
                    'requested' => $e->requested,
                    'available' => $e->available,
                ]],
                Response::HTTP_CONFLICT,
            );
        } catch (\InvalidArgumentException $e) {
            return $this->json(
                ['status' => 'error', 'type' => 'invalid', 'message' => $e->getMessage()],
                Response::HTTP_BAD_REQUEST,
            );
        } finally {
            // This block ALWAYS runs — useful for logging, cleanup, etc.
            // In production, you would log here.
        }
    }
}
```

**Step 4:** Test all scenarios:

```bash
curl https://127.0.0.1:8000/php/exception-demo/ok
curl https://127.0.0.1:8000/php/exception-demo/not-found
curl https://127.0.0.1:8000/php/exception-demo/no-stock
curl https://127.0.0.1:8000/php/exception-demo/unknown
```


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Exception and error handling"](https://symfonycasts.com/search?q=exception%2Band%2Berror%2Bhandling)
