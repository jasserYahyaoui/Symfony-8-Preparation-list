## User's locale guessing - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
#[Route('/routing/{_locale}/welcome', name: 'routing_locale_welcome',
    requirements: ['_locale' => 'en|fr|de|es'],
    methods: ['GET'])]
public function localizedWelcome(string $_locale): JsonResponse
{
    $messages = [
        'en' => 'Welcome!',
        'fr' => 'Bienvenue !',
        'de' => 'Willkommen!',
        'es' => '¡Bienvenido!',
    ];

    return $this->json([
        'locale' => $_locale,
        'message' => $messages[$_locale] ?? $messages['en'],
    ]);
}
```

**Step 4:** Test:

```bash
curl https://127.0.0.1:8000/routing/fr/welcome
curl https://127.0.0.1:8000/routing/de/welcome
curl https://127.0.0.1:8000/routing/ja/welcome  # ❌ 404 (not in requirements)
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "User's locale guessing"](https://symfonycasts.com/search?q=user%27s%2Blocale%2Bguessing)
