## Expiration (Expires, Cache-Control) - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Set a response to be cached publicly for 10 minutes and privately for 2 minutes.

<details><summary>Click to reveal Solution</summary>

```php
$response->setPublic();
$response->setMaxAge(120);          // Private/browser: 2 min
$response->setSharedMaxAge(600);    // Shared/CDN: 10 min
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Expiration (Expires, Cache-Control)"](https://symfonycasts.com/search?q=expiration%2B%28expires%2C%2Bcache-control%29)
