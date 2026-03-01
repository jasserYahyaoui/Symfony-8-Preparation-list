## Conditional request matching - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a route that only matches when the `X-Debug` header is present.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/routing/debug-only', name: 'routing_debug_only',
    condition: "request.headers.has('X-Debug')",
    methods: ['GET'])]
public function debugOnly(): JsonResponse
{
    return $this->json(['debug' => true]);
}
```

Test: `curl -H "X-Debug: 1" https://127.0.0.1:8000/routing/debug-only`

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Conditional request matching"](https://symfonycasts.com/search?q=conditional%2Brequest%2Bmatching)
