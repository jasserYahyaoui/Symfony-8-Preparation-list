# Code Review #5: Twig Extension

## The Code

```php
namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class AppExtension extends AbstractExtension
{
    public function getFilters()
    {
        return [
            new TwigFilter('price', [$this, 'formatPrice']),
        ];
    }

    public function formatPrice(float $number): string
    {
        return '$' . number_format($number, 2);
    }
}
```

**Question:** What is the missing type declaration required in modern Symfony 8 / PHP 8 for Twig Extensions?

<details>
<summary>Reveal the Bug & Solution</summary>

**Answer:** The `getFilters()` method MUST have a return type declaration of `array`: `public function getFilters(): array`. Without it, you will get a deprecation or fatal error depending on strictness.

</details>
