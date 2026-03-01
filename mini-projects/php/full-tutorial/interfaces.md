## Interfaces - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create an interface and two implementations.

```bash
mkdir -p src/Service/PhpTopic/Notifier
touch src/Service/PhpTopic/Notifier/NotifierInterface.php
touch src/Service/PhpTopic/Notifier/EmailNotifier.php
touch src/Service/PhpTopic/Notifier/SmsNotifier.php
touch src/Controller/PhpTopic/InterfaceController.php
```

**Step 2:** Place them in `src/Service/PhpTopic/Notifier/`.

**Step 3:**

`src/Service/PhpTopic/Notifier/NotifierInterface.php`:
```php
<?php

namespace App\Service\PhpTopic\Notifier;

interface NotifierInterface
{
    public function send(string $recipient, string $message): array;

    public function getChannel(): string;
}
```

`src/Service/PhpTopic/Notifier/EmailNotifier.php`:
```php
<?php

namespace App\Service\PhpTopic\Notifier;

class EmailNotifier implements NotifierInterface
{
    public function send(string $recipient, string $message): array
    {
        return [
            'channel' => $this->getChannel(),
            'to' => $recipient,
            'body' => $message,
            'status' => 'sent',
        ];
    }

    public function getChannel(): string
    {
        return 'email';
    }
}
```

`src/Service/PhpTopic/Notifier/SmsNotifier.php`:
```php
<?php

namespace App\Service\PhpTopic\Notifier;

class SmsNotifier implements NotifierInterface
{
    public function send(string $recipient, string $message): array
    {
        return [
            'channel' => $this->getChannel(),
            'to' => $recipient,
            'body' => mb_substr($message, 0, 160), // SMS limit
            'status' => 'queued',
        ];
    }

    public function getChannel(): string
    {
        return 'sms';
    }
}
```

`src/Controller/PhpTopic/InterfaceController.php`:
```php
<?php

namespace App\Controller\PhpTopic;

use App\Service\PhpTopic\Notifier\NotifierInterface;
use App\Service\PhpTopic\Notifier\EmailNotifier;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class InterfaceController extends AbstractController
{
    #[Route('/php/interface-demo', name: 'php_interface_demo', methods: ['GET'])]
    public function index(EmailNotifier $notifier): JsonResponse
    {
        // The notifier satisfies NotifierInterface
        $result = $notifier->send('user@example.com', 'Hello from Symfony 8!');

        return $this->json([
            'implements_interface' => $notifier instanceof NotifierInterface,
            'notification' => $result,
        ]);
    }
}
```

**Step 4:** Test it:

```bash
curl https://127.0.0.1:8000/php/interface-demo
```


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Interfaces"](https://symfonycasts.com/search?q=interfaces)
