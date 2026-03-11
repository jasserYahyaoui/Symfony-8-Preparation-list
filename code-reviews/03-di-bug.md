# Code Review #3: Dependency Injection

## The Code

```php
namespace App\Service;

use Psr\Log\LoggerInterface;

class ReportGenerator
{
    private LoggerInterface $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }
}
```

**Question:** While the code works, what is the modern PHP 8 way to write this constructor, expected in the Symfony 8 certification?

<details>
<summary>Reveal the Bug & Solution</summary>

**Answer:** You should use **Constructor Property Promotion**. Valid code: `public function __construct(private LoggerInterface $logger) {}`. You can also add `readonly`.

</details>
