## Server side caching (Symfony HttpCache / reverse proxy) - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Enable HttpCache in `public/index.php`:

```php
// After the kernel creation, wrap with HttpCache:
use Symfony\Bundle\FrameworkBundle\HttpCache\HttpCache;

$kernel = new Kernel($_SERVER['APP_ENV'], (bool) $_SERVER['APP_DEBUG']);
$kernel = new HttpCache($kernel);

// ... rest of index.php
```

**Step 2:** Responses with `public` Cache-Control will now be cached by the reverse proxy.

**Step 4:** Test: Hit a cached endpoint twice — the second request should be served from cache without hitting the controller.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Server side caching (Symfony HttpCache / reverse proxy)"](https://symfonycasts.com/search?q=server%2Bside%2Bcaching%2B%28symfony%2Bhttpcache%2B/%2Breverse%2Bproxy%29)
