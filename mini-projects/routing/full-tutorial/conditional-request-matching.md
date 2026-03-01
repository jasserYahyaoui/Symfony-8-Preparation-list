## Conditional request matching - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
#[Route('/routing/conditional', name: 'routing_conditional',
    condition: "request.headers.get('User-Agent') matches '/curl/i'",
    methods: ['GET'])]
public function conditional(): JsonResponse
{
    return $this->json(['message' => 'This route only matches requests from curl!']);
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/routing/conditional   # ✅ curl User-Agent matches
# Browser visit would 404 (different User-Agent)
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Conditional request matching"](https://symfonycasts.com/search?q=conditional%2Brequest%2Bmatching)
