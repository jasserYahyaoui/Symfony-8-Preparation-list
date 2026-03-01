## Traits - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `SoftDeletableTrait` with `softDelete()`, `restore()`, `isDeleted(): bool`, and a `?DateTimeImmutable $deletedAt` property. Use it alongside `TimestampableTrait`.

**Hints:**
- Property: `private ?\DateTimeImmutable $deletedAt = null;`.
- `softDelete()` sets `$deletedAt = new \DateTimeImmutable()`.
- `restore()` sets `$deletedAt = null`.

**Testing:** Endpoint should show entity state after delete and restore.

<details><summary>Click to reveal Solution</summary>

```php
<?php

namespace App\Trait;

trait SoftDeletableTrait
{
    private ?\DateTimeImmutable $deletedAt = null;

    public function softDelete(): void
    {
        $this->deletedAt = new \DateTimeImmutable();
    }

    public function restore(): void
    {
        $this->deletedAt = null;
    }

    public function isDeleted(): bool
    {
        return $this->deletedAt !== null;
    }

    public function getDeletedAt(): ?\DateTimeImmutable
    {
        return $this->deletedAt;
    }
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Traits"](https://symfonycasts.com/search?q=traits)
