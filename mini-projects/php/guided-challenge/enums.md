## Enums - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a pure enum `Priority` with cases `Low`, `Medium`, `High`, `Critical`. Add a `color(): string` method. No backing type.

**Hints:**
- Pure enums have no `string`/`int` backing → no `from()`/`tryFrom()`.
- Use `match($this)` in the `color()` method.
- Use `Priority::cases()` to list all.

**Testing:** Endpoint should list all priorities with their colors.

<details><summary>Click to reveal Solution</summary>

```php
<?php

namespace App\Enum;

enum Priority
{
    case Low;
    case Medium;
    case High;
    case Critical;

    public function color(): string
    {
        return match ($this) {
            self::Low => '#22c55e',
            self::Medium => '#f59e0b',
            self::High => '#ef4444',
            self::Critical => '#7c3aed',
        };
    }
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Enums"](https://symfonycasts.com/search?q=enums)
