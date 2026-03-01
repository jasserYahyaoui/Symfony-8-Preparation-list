## User's locale guessing - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a route prefix that applies `{_locale}` to an entire controller class using the class-level `#[Route]`.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/{_locale}/localized', requirements: ['_locale' => 'en|fr|de'])]
class LocalizedController extends AbstractController
{
    #[Route('/page1', name: 'localized_page1')]
    public function page1(string $_locale): JsonResponse
    {
        return $this->json(['locale' => $_locale, 'page' => 1]);
    }

    #[Route('/page2', name: 'localized_page2')]
    public function page2(string $_locale): JsonResponse
    {
        return $this->json(['locale' => $_locale, 'page' => 2]);
    }
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "User's locale guessing"](https://symfonycasts.com/search?q=user%27s%2Blocale%2Bguessing)
