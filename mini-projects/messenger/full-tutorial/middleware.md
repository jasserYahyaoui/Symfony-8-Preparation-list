## Middleware - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
mkdir -p src/Middleware
touch src/Middleware/LoggingMiddleware.php
```

```php
<?php

namespace App\Middleware;

use Psr\Log\LoggerInterface;
use Symfony\Component\Messenger\Envelope;
use Symfony\Component\Messenger\Middleware\MiddlewareInterface;
use Symfony\Component\Messenger\Middleware\StackInterface;

class LoggingMiddleware implements MiddlewareInterface
{
    public function __construct(
        private readonly LoggerInterface $logger,
    ) {}

    public function handle(Envelope $envelope, StackInterface $stack): Envelope
    {
        $messageClass = get_class($envelope->getMessage());
        $this->logger->info('[Messenger] Dispatching: {class}', ['class' => $messageClass]);

        $start = microtime(true);

        // Pass to the next middleware
        $envelope = $stack->next()->handle($envelope, $stack);

        $duration = round((microtime(true) - $start) * 1000, 2);
        $this->logger->info('[Messenger] Handled: {class} in {ms}ms', [
            'class' => $messageClass,
            'ms' => $duration,
        ]);

        return $envelope;
    }
}
```

Register in `config/packages/messenger.yaml`:
```yaml
framework:
    messenger:
        buses:
            messenger.bus.default:
                middleware:
                    - App\Middleware\LoggingMiddleware
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Middleware"](https://symfonycasts.com/search?q=middleware)
