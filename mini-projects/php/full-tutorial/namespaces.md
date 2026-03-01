## Namespaces - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create two files in different namespaces that reference each other.

```bash
mkdir -p src/Service/PhpTopic/Billing
touch src/Service/PhpTopic/Billing/InvoiceGenerator.php
touch src/Controller/PhpTopic/NamespaceController.php
```

**Step 2:** Place them in their respective directories as shown above.

**Step 3:** `src/Service/PhpTopic/Billing/InvoiceGenerator.php`:

```php
<?php

namespace App\Service\PhpTopic\Billing;

class InvoiceGenerator
{
    public function generate(string $customerName, float $amount): array
    {
        return [
            'invoice_id' => 'INV-' . bin2hex(random_bytes(4)),
            'customer' => $customerName,
            'amount' => $amount,
            'currency' => 'EUR',
            'generated_at' => (new \DateTimeImmutable())->format('Y-m-d H:i:s'),
            // Note: \DateTimeImmutable uses the backslash for global namespace
        ];
    }
}
```

`src/Controller/PhpTopic/NamespaceController.php`:

```php
<?php

namespace App\Controller\PhpTopic;

// Fully qualified import
use App\Service\PhpTopic\Billing\InvoiceGenerator;
// Aliased import
use Symfony\Component\HttpFoundation\JsonResponse as Json;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;

class NamespaceController extends AbstractController
{
    #[Route('/php/namespace-demo', name: 'php_namespace_demo', methods: ['GET'])]
    public function index(InvoiceGenerator $generator): Json
    {
        $invoice = $generator->generate('Jasser', 150.00);

        return new Json([
            'namespace_of_controller' => __NAMESPACE__,
            'class_of_controller' => __CLASS__,
            'fully_qualified_generator' => InvoiceGenerator::class,
            'invoice' => $invoice,
        ]);
    }
}
```

**Step 4:** Test it:

```bash
curl https://127.0.0.1:8000/php/namespace-demo
```

Expected: JSON showing the fully qualified class names and a generated invoice.


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Namespaces"](https://symfonycasts.com/search?q=namespaces)
