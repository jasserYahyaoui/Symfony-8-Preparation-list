## HTTP methods - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a summary endpoint `/http/method-cheatsheet` that returns a table of ALL HTTP methods with their safety, idempotency, and cacheability flags.

**Hints:**
- Return a JSON array of objects with keys: `method`, `safe`, `idempotent`, `cacheable`.
- Include: GET, HEAD, POST, PUT, DELETE, PATCH, OPTIONS.

**Testing:** `curl https://127.0.0.1:8000/http/method-cheatsheet`.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/method-cheatsheet', name: 'http_method_cheatsheet', methods: ['GET'])]
public function cheatsheet(): JsonResponse
{
    return $this->json([
        ['method' => 'GET',     'safe' => true,  'idempotent' => true,  'cacheable' => true],
        ['method' => 'HEAD',    'safe' => true,  'idempotent' => true,  'cacheable' => true],
        ['method' => 'POST',    'safe' => false, 'idempotent' => false, 'cacheable' => false],
        ['method' => 'PUT',     'safe' => false, 'idempotent' => true,  'cacheable' => false],
        ['method' => 'DELETE',  'safe' => false, 'idempotent' => true,  'cacheable' => false],
        ['method' => 'PATCH',   'safe' => false, 'idempotent' => false, 'cacheable' => false],
        ['method' => 'OPTIONS', 'safe' => true,  'idempotent' => true,  'cacheable' => false],
    ]);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "HTTP methods"](https://symfonycasts.com/search?q=http%2Bmethods)
