## The request - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create `/controllers/request-type-check` that returns whether the request is: safe, idempotent, cacheable, and HTTPS.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/request-type-check', name: 'ctrl_request_type', methods: ['GET', 'POST', 'PUT', 'DELETE'])]
public function typeCheck(Request $request): JsonResponse
{
    return $this->json([
        'method' => $request->getMethod(),
        'is_safe' => $request->isMethodSafe(),
        'is_idempotent' => $request->isMethodIdempotent(),
        'is_cacheable' => $request->isMethodCacheable(),
        'is_secure' => $request->isSecure(),
    ]);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "The request"](https://symfonycasts.com/search?q=the%2Brequest)
