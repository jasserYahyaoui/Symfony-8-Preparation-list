# Code Review #11: Event Listener

## The Code

```php
namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\RequestEvent;

class ExceptionListener
{
    public function onKernelException(RequestEvent $event)
    {
        // ...
    }
}
```

**Question:** What is the bug regarding Event types?

<details>
<summary>Reveal the Bug & Solution</summary>

**Answer:** The `onKernelException` method receives an `ExceptionEvent`, not a `RequestEvent`.

</details>
