## Console events - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/EventSubscriber/ConsoleTopic/ConsoleEventSubscriber.php
```

```php
<?php

namespace App\EventSubscriber\ConsoleTopic;

use Psr\Log\LoggerInterface;
use Symfony\Component\Console\ConsoleEvents;
use Symfony\Component\Console\Event\ConsoleCommandEvent;
use Symfony\Component\Console\Event\ConsoleErrorEvent;
use Symfony\Component\Console\Event\ConsoleTerminateEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ConsoleEventSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly LoggerInterface $logger,
    ) {}

    public static function getSubscribedEvents(): array
    {
        return [
            ConsoleEvents::COMMAND => 'onCommand',
            ConsoleEvents::TERMINATE => 'onTerminate',
            ConsoleEvents::ERROR => 'onError',
        ];
    }

    public function onCommand(ConsoleCommandEvent $event): void
    {
        $this->logger->info('[Console] Running: {name}', [
            'name' => $event->getCommand()?->getName(),
        ]);
    }

    public function onTerminate(ConsoleTerminateEvent $event): void
    {
        $this->logger->info('[Console] Finished: {name} (exit {code})', [
            'name' => $event->getCommand()?->getName(),
            'code' => $event->getExitCode(),
        ]);
    }

    public function onError(ConsoleErrorEvent $event): void
    {
        $this->logger->error('[Console] Error in {name}: {error}', [
            'name' => $event->getCommand()?->getName(),
            'error' => $event->getError()->getMessage(),
        ]);
    }
}
```

**Step 4:** Run any command and check logs: `php bin/console app:greet Jasser && tail -3 var/log/dev.log`


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Console events"](https://symfonycasts.com/search?q=console%2Bevents)
