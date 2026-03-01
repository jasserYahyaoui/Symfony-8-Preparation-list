## HTTP methods matching - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
#[Route('/routing/resource', name: 'routing_resource_get', methods: ['GET'])]
public function getResource(): JsonResponse
{
    return $this->json(['action' => 'read']);
}

#[Route('/routing/resource', name: 'routing_resource_post', methods: ['POST'])]
public function createResource(): JsonResponse
{
    return $this->json(['action' => 'create'], 201);
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/routing/resource            # GET
curl -X POST https://127.0.0.1:8000/routing/resource     # POST
curl -X PUT https://127.0.0.1:8000/routing/resource      # 405 Method Not Allowed
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "HTTP methods matching"](https://symfonycasts.com/search?q=http%2Bmethods%2Bmatching)
