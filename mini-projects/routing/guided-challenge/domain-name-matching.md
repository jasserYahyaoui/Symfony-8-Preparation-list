## Domain name matching - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a route that only matches `api.example.com/v1/status`.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/v1/status', name: 'routing_api_status', host: 'api.{base}',
    defaults: ['base' => 'example.com'],
    requirements: ['base' => '.+'],
    methods: ['GET'])]
public function apiStatus(string $base): JsonResponse
{
    return $this->json(['host' => "api.{$base}", 'status' => 'ok']);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Domain name matching"](https://symfonycasts.com/search?q=domain%2Bname%2Bmatching)
