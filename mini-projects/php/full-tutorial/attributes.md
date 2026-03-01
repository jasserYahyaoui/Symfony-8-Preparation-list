## Attributes - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create a custom attribute and a service that reads it.

```bash
mkdir -p src/Attribute
touch src/Attribute/AuditLog.php
touch src/Service/PhpTopic/AuditService.php
touch src/Controller/PhpTopic/AttributeController.php
```

**Step 2:** Place files as shown above.

**Step 3:**

`src/Attribute/AuditLog.php`:
```php
<?php

namespace App\Attribute;

#[\Attribute(\Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
class AuditLog
{
    public function __construct(
        public readonly string $action,
        public readonly string $level = 'info',
    ) {}
}
```

`src/Service/PhpTopic/AuditService.php`:
```php
<?php

namespace App\Service\PhpTopic;

use App\Attribute\AuditLog;

class AuditService
{
    /**
     * Uses Reflection API to read attributes from a given class method.
     */
    public function getAuditLogs(string $className, string $methodName): array
    {
        $reflection = new \ReflectionMethod($className, $methodName);
        $attributes = $reflection->getAttributes(AuditLog::class);

        return array_map(
            fn(\ReflectionAttribute $attr) => $attr->newInstance(),
            $attributes,
        );
    }
}
```

`src/Controller/PhpTopic/AttributeController.php`:
```php
<?php

namespace App\Controller\PhpTopic;

use App\Attribute\AuditLog;
use App\Service\PhpTopic\AuditService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class AttributeController extends AbstractController
{
    #[Route('/php/attribute-demo', name: 'php_attribute_demo', methods: ['GET'])]
    #[AuditLog(action: 'viewed_attribute_demo', level: 'info')]
    #[AuditLog(action: 'accessed_php_topic', level: 'debug')]
    public function index(AuditService $auditService): JsonResponse
    {
        $logs = $auditService->getAuditLogs(self::class, 'index');

        return $this->json([
            'audit_logs' => array_map(fn(AuditLog $log) => [
                'action' => $log->action,
                'level' => $log->level,
            ], $logs),
        ]);
    }
}
```

**Step 4:** Test it:

```bash
curl https://127.0.0.1:8000/php/attribute-demo
```

Expected: JSON showing both audit log entries read from the attributes.


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Attributes"](https://symfonycasts.com/search?q=attributes)
