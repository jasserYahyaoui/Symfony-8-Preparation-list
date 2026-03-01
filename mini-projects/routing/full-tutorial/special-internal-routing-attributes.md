## Special internal routing attributes - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Add to `UrlGenerationController.php`:

```php
#[Route('/special/{_locale}/page.{_format}', name: 'routing_special',
    requirements: ['_locale' => 'en|fr|de', '_format' => 'json|xml|html'],
    defaults: ['_format' => 'json'],
    methods: ['GET'])]
public function specialAttributes(string $_locale, string $_format): JsonResponse
{
    return $this->json([
        '_locale' => $_locale,
        '_format' => $_format,
        'note' => 'These are special routing attributes recognized by Symfony',
        'all_special' => ['_controller', '_format', '_fragment', '_locale'],
    ]);
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/routing/special/fr/page.json
curl https://127.0.0.1:8000/routing/special/en/page.xml
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Special internal routing attributes"](https://symfonycasts.com/search?q=special%2Binternal%2Brouting%2Battributes)
