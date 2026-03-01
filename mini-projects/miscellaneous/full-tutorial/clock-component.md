## Clock component - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
composer require symfony/clock
```

```php
use Symfony\Component\Clock\ClockInterface;

#[Route('/clock-demo', name: 'misc_clock')]
public function clockDemo(ClockInterface $clock): JsonResponse
{
    $now = $clock->now(); // Returns DateTimeImmutable

    return $this->json([
        'current_time' => $now->format('Y-m-d H:i:s'),
        'timezone' => $now->getTimezone()->getName(),
        'timestamp' => $now->getTimestamp(),
        'why_use_clock' => 'Testable! In tests, use MockClock to freeze/manipulate time.',
    ]);
}
```

**In tests:**
```php
use Symfony\Component\Clock\MockClock;

$clock = new MockClock('2026-01-15 12:00:00');
$clock->now(); // Always returns 2026-01-15 12:00:00
$clock->sleep(3600); // Advance 1 hour
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Clock component"](https://symfonycasts.com/search?q=clock%2Bcomponent)
