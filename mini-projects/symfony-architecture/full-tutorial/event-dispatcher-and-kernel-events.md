## Event dispatcher and kernel events - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create an event subscriber.

```bash
touch src/EventSubscriber/ArchitectureTopic/RequestTimingSubscriber.php
```

**Step 2:** Place in `src/EventSubscriber/ArchitectureTopic/`.

**Step 3:**

```php
<?php

namespace App\EventSubscriber\ArchitectureTopic;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class RequestTimingSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => ['onKernelRequest', 100],  // High priority = runs early
            KernelEvents::RESPONSE => ['onKernelResponse', -100], // Low priority = runs late
        ];
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        if (!$event->isMainRequest()) {
            return; // Skip sub-requests
        }

        // Store the start time on the request attributes
        $event->getRequest()->attributes->set('_request_start_time', microtime(true));
    }

    public function onKernelResponse(ResponseEvent $event): void
    {
        if (!$event->isMainRequest()) {
            return;
        }

        $startTime = $event->getRequest()->attributes->get('_request_start_time');
        if ($startTime) {
            $duration = round((microtime(true) - $startTime) * 1000, 2); // ms
            $event->getResponse()->headers->set('X-Request-Duration-Ms', (string) $duration);
        }
    }
}
```

**Step 4:** Test it — every response should now have the timing header:

```bash
curl -i https://127.0.0.1:8000/architecture/lifecycle
# Look for: X-Request-Duration-Ms header
```

Verify the subscriber is registered:

```bash
php bin/console debug:event-dispatcher kernel.request | grep Timing
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Event dispatcher and kernel events"](https://symfonycasts.com/search?q=event%2Bdispatcher%2Band%2Bkernel%2Bevents)
