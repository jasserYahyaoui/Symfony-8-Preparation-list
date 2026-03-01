## Cache component - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between `CacheInterface` (PSR-6/contracts) and `TagAwareCacheInterface`?

<details><summary>Click to reveal Solution</summary>

- **`CacheInterface`**: Standard caching — get/set by key, with TTL.
- **`TagAwareCacheInterface`**: Adds **tagging** — mark cached items with tags, then invalidate ALL items with a specific tag at once.

```php
$cache->get('products_list', function (ItemInterface $item) {
    $item->tag(['products', 'catalog']);
    return [...];
});

// Later: invalidate all items tagged 'products'
$cache->invalidateTags(['products']);
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Cache component"](https://symfonycasts.com/search?q=cache%2Bcomponent)
