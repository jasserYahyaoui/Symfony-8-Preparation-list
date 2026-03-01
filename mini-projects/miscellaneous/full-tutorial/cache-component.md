## Cache component - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
use Symfony\Contracts\Cache\CacheInterface;
use Symfony\Contracts\Cache\ItemInterface;

#[Route('/cache-demo', name: 'misc_cache')]
public function cacheDemo(CacheInterface $cache): JsonResponse
{
    $value = $cache->get('expensive_computation', function (ItemInterface $item): array {
        $item->expiresAfter(60); // Cache for 60 seconds

        // Simulate expensive work
        usleep(500_000); // 500ms
        return ['computed_at' => date('H:i:s'), 'result' => random_int(1, 100)];
    });

    return $this->json(['cached_value' => $value, 'served_at' => date('H:i:s')]);
}
```

**Step 4:** Test: Hit the endpoint twice quickly — second call should be instant (cached).


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Cache component"](https://symfonycasts.com/search?q=cache%2Bcomponent)
