## Interfaces - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `PushNotifier` that implements `NotifierInterface`. Then create a `NotificationHub` service that takes an `iterable` of `NotifierInterface` and sends to ALL channels.

**Hints:**
- Use `#[AutoconfigureTag('app.notifier')]` on the interface or configure tagged services.
- `NotificationHub` constructor: `public function __construct(private iterable $notifiers)`.
- Loop over `$this->notifiers` and call `->send()` on each.

**Testing:** `/php/hub-demo` should return results from all 3 channels.

<details><summary>Click to reveal Solution</summary>

`src/Service/PhpTopic/Notifier/PushNotifier.php`:
```php
<?php

namespace App\Service\PhpTopic\Notifier;

class PushNotifier implements NotifierInterface
{
    public function send(string $recipient, string $message): array
    {
        return ['channel' => 'push', 'to' => $recipient, 'body' => $message, 'status' => 'delivered'];
    }

    public function getChannel(): string
    {
        return 'push';
    }
}
```

`src/Service/PhpTopic/Notifier/NotificationHub.php`:
```php
<?php

namespace App\Service\PhpTopic\Notifier;

use Symfony\Component\DependencyInjection\Attribute\AutowireIterator;

class NotificationHub
{
    public function __construct(
        #[AutowireIterator('app.notifier')]
        private iterable $notifiers,
    ) {}

    public function broadcast(string $recipient, string $message): array
    {
        $results = [];
        foreach ($this->notifiers as $notifier) {
            $results[] = $notifier->send($recipient, $message);
        }
        return $results;
    }
}
```

Add to `config/services.yaml`:
```yaml
services:
    App\Service\PhpTopic\Notifier\NotifierInterface:
        tags: ['app.notifier']
```

Or use `#[AutoconfigureTag('app.notifier')]` on the interface.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Interfaces"](https://symfonycasts.com/search?q=interfaces)
