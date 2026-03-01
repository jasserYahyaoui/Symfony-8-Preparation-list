## URLs generation - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Generate both a relative and absolute URL for `routing_article` with `year=2026` and `slug=symfony-8`. Include an extra query parameter `highlight=true`.

<details><summary>Click to reveal Solution</summary>

```php
$relative = $this->generateUrl('routing_article', [
    'year' => 2026, 'slug' => 'symfony-8', 'highlight' => true
]);
$absolute = $this->generateUrl('routing_article', [
    'year' => 2026, 'slug' => 'symfony-8', 'highlight' => true
], UrlGeneratorInterface::ABSOLUTE_URL);
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "URLs generation"](https://symfonycasts.com/search?q=urls%2Bgeneration)
