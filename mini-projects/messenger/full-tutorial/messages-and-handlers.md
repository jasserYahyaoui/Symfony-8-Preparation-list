## Messages and handlers - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Message/SendNotification.php
touch src/MessageHandler/SendNotificationHandler.php
```

`src/Message/SendNotification.php`:
```php
<?php

namespace App\Message;

class SendNotification
{
    public function __construct(
        public readonly string $recipient,
        public readonly string $subject,
        public readonly string $body,
    ) {}
}
```

`src/MessageHandler/SendNotificationHandler.php`:
```php
<?php

namespace App\MessageHandler;

use App\Message\SendNotification;
use Psr\Log\LoggerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class SendNotificationHandler
{
    public function __construct(
        private readonly LoggerInterface $logger,
    ) {}

    public function __invoke(SendNotification $message): void
    {
        // In production: send email, push notification, SMS, etc.
        $this->logger->info('Notification sent to {recipient}: {subject}', [
            'recipient' => $message->recipient,
            'subject' => $message->subject,
        ]);
    }
}
```

Dispatch from a controller:
```php
use App\Message\SendNotification;
use Symfony\Component\Messenger\MessageBusInterface;

#[Route('/send', name: 'messenger_send', methods: ['POST'])]
public function send(Request $request, MessageBusInterface $bus): JsonResponse
{
    $payload = $request->toArray();

    $bus->dispatch(new SendNotification(
        recipient: $payload['to'] ?? 'user@test.com',
        subject: $payload['subject'] ?? 'Hello',
        body: $payload['body'] ?? 'Test message',
    ));

    return $this->json(['status' => 'dispatched'], 202);
}
```

**Step 4:** Test:

```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"to":"admin@test.com","subject":"Test","body":"Hello!"}' \
     https://127.0.0.1:8000/messenger/send

# Check logs
tail -5 var/log/dev.log | grep Notification
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Messages and handlers"](https://symfonycasts.com/search?q=messages%2Band%2Bhandlers)
