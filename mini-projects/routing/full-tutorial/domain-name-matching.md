## Domain name matching - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Add a host-restricted route:

```php
#[Route('/routing/admin-panel', name: 'routing_admin_host', host: 'admin.{domain}',
    defaults: ['domain' => 'localhost'],
    requirements: ['domain' => '.+'],
    methods: ['GET'])]
public function adminHost(string $domain): JsonResponse
{
    return $this->json(['domain' => $domain, 'only_on_host' => 'admin.*']);
}
```

**Step 4:** Test (requires host manipulation):

```bash
curl -H "Host: admin.localhost" https://127.0.0.1:8000/routing/admin-panel
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Domain name matching"](https://symfonycasts.com/search?q=domain%2Bname%2Bmatching)
