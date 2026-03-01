## Event dispatcher and kernel events - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `MaintenanceModeSubscriber` that checks for a `MAINTENANCE_MODE=1` environment variable and returns a 503 response for ALL requests when it's set.

**Hints:**
- Listen on `KernelEvents::REQUEST` with high priority.
- Check `$_ENV['MAINTENANCE_MODE'] ?? '0'` or inject `%env(MAINTENANCE_MODE)%`.
- Use `$event->setResponse(new Response(..., 503))` to short-circuit.

**Testing:** Set `MAINTENANCE_MODE=1` in `.env.local`, restart server, hit any URL → should get 503.

<details><summary>Click to reveal Solution</summary>

```php
<?php

namespace App\EventSubscriber\ArchitectureTopic;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class MaintenanceModeSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly string $maintenanceMode,
    ) {}

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => ['onRequest', 255],
        ];
    }

    public function onRequest(RequestEvent $event): void
    {
        if ($this->maintenanceMode === '1' && $event->isMainRequest()) {
            $event->setResponse(new Response(
                'Service temporarily unavailable. Please try again later.',
                Response::HTTP_SERVICE_UNAVAILABLE,
            ));
        }
    }
}
```

In `services.yaml`:
```yaml
App\EventSubscriber\ArchitectureTopic\MaintenanceModeSubscriber:
    arguments:
        $maintenanceMode: '%env(default::MAINTENANCE_MODE)%'
```

In `.env`:
```
MAINTENANCE_MODE=0
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Event dispatcher and kernel events"](https://symfonycasts.com/search?q=event%2Bdispatcher%2Band%2Bkernel%2Bevents)
