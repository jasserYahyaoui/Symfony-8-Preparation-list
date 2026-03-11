# Code Review #7: Messenger Handler

## The Code

```php
namespace App\MessageHandler;

use App\Message\SendEmailMessage;
use Symfony\Component\Messenger\Handler\MessageHandlerInterface;

class SendEmailMessageHandler implements MessageHandlerInterface
{
    public function __invoke(SendEmailMessage $message)
    {
        // send email logic...
    }
}
```

**Question:** What is the issue with this Messenger Handler in Symfony 8?

<details>
<summary>Reveal the Bug & Solution</summary>

**Answer:** `MessageHandlerInterface` is deprecated/removed. You MUST use the `#[AsMessageHandler]` attribute instead of implementing the marker interface.

</details>
