## Namespaces - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `TaxCalculator` class in `App\Service\PhpTopic\Tax` namespace. Import it with an alias `Tax` in a new endpoint `/php/tax-demo`.

**Hints:**
- Namespace must match directory: `src/Service/PhpTopic/Tax/TaxCalculator.php`.
- Use `use App\Service\PhpTopic\Tax\TaxCalculator as Tax;`.
- Method: `calculateVat(float $amount, float $rate = 0.20): array`.

**Testing:** `curl https://127.0.0.1:8000/php/tax-demo` should return the VAT calculation.

<details><summary>Click to reveal Solution</summary>

`src/Service/PhpTopic/Tax/TaxCalculator.php`:
```php
<?php

namespace App\Service\PhpTopic\Tax;

class TaxCalculator
{
    public function calculateVat(float $amount, float $rate = 0.20): array
    {
        return [
            'net' => $amount,
            'vat_rate' => $rate,
            'vat_amount' => round($amount * $rate, 2),
            'gross' => round($amount * (1 + $rate), 2),
        ];
    }
}
```

`src/Controller/PhpTopic/TaxController.php`:
```php
<?php

namespace App\Controller\PhpTopic;

use App\Service\PhpTopic\Tax\TaxCalculator as Tax;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class TaxController extends AbstractController
{
    #[Route('/php/tax-demo', name: 'php_tax_demo', methods: ['GET'])]
    public function index(Tax $calculator): JsonResponse
    {
        return $this->json($calculator->calculateVat(100.00));
    }
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Namespaces"](https://symfonycasts.com/search?q=namespaces)
