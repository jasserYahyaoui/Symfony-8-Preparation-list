## Messenger component and FrameworkBundle - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch src/Controller/MessengerTopic/MessengerController.php
```

```php
<?php

namespace App\Controller\MessengerTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/messenger')]
class MessengerController extends AbstractController
{
    #[Route('/overview', name: 'messenger_overview')]
    public function overview(): JsonResponse
    {
        return $this->json([
            'components' => [
                'Message' => 'A plain PHP class (DTO) describing what should happen',
                'Handler' => 'The logic that processes a Message',
                'Bus' => 'Dispatches messages to their handlers (MessageBusInterface)',
                'Transport' => 'How messages are sent/received (sync, async, doctrine, redis, amqp)',
                'Envelope' => 'Wraps Message + Stamps (metadata)',
                'Stamps' => 'Metadata attached to messages (delay, transport, handled, etc.)',
                'Middleware' => 'Pre/post processing pipeline for messages',
            ],
        ]);
    }
}
```

**Step 4:** Test: `curl https://127.0.0.1:8000/messenger/overview`


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Messenger component and FrameworkBundle"](https://symfonycasts.com/search?q=messenger%2Bcomponent%2Band%2Bframeworkbundle)
