## Attributes - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `#[CacheFor]` attribute that accepts a `ttl` (int, seconds) and a `key` (string). Apply it to a controller method and read it via reflection.

**Hints:**
- `#[\Attribute(\Attribute::TARGET_METHOD)]` — not repeatable.
- Two constructor parameters: `int $ttl = 3600` and `string $key`.
- Use `ReflectionMethod::getAttributes()` to read it.

**Testing:** `curl https://127.0.0.1:8000/php/cache-attr-demo` should return the TTL and key values.

<details><summary>Click to reveal Solution</summary>

`src/Attribute/CacheFor.php`:
```php
<?php

namespace App\Attribute;

#[\Attribute(\Attribute::TARGET_METHOD)]
class CacheFor
{
    public function __construct(
        public readonly string $key,
        public readonly int $ttl = 3600,
    ) {}
}
```

Add to `AttributeController`:
```php
use App\Attribute\CacheFor;

#[Route('/php/cache-attr-demo', name: 'php_cache_attr_demo', methods: ['GET'])]
#[CacheFor(key: 'php_cache_demo', ttl: 600)]
public function cacheAttrDemo(): JsonResponse
{
    $ref = new \ReflectionMethod(self::class, 'cacheAttrDemo');
    $attrs = $ref->getAttributes(CacheFor::class);
    $cacheFor = $attrs[0]->newInstance();

    return $this->json([
        'key' => $cacheFor->key,
        'ttl' => $cacheFor->ttl,
    ]);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Attributes"](https://symfonycasts.com/search?q=attributes)
