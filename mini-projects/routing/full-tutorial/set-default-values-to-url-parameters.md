## Set default values to URL parameters - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Add to `ParameterController.php`:

```php
// Optional parameter with default value
#[Route('/listing/{page}', name: 'routing_listing', requirements: ['page' => '\d+'], defaults: ['page' => 1], methods: ['GET'])]
public function listing(int $page): JsonResponse
{
    return $this->json(['page' => $page, 'note' => 'Defaults to page 1 if not provided']);
}

// PHP default value (alternative syntax)
#[Route('/search/{query}/{limit}', name: 'routing_search', requirements: ['limit' => '\d+'], methods: ['GET'])]
public function search(string $query, int $limit = 10): JsonResponse
{
    return $this->json(['query' => $query, 'limit' => $limit]);
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/routing/listing        # page = 1 (default)
curl https://127.0.0.1:8000/routing/listing/3       # page = 3
curl https://127.0.0.1:8000/routing/search/symfony   # limit = 10 (default)
curl https://127.0.0.1:8000/routing/search/symfony/25 # limit = 25
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Set default values to URL parameters"](https://symfonycasts.com/search?q=set%2Bdefault%2Bvalues%2Bto%2Burl%2Bparameters)
