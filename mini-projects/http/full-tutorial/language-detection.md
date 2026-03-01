## Language detection - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create the controller.

```bash
touch src/Controller/HttpTopic/LanguageController.php
```

**Step 2:** Place in `src/Controller/HttpTopic/LanguageController.php`.

**Step 3:**

```php
<?php

namespace App\Controller\HttpTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/http')]
class LanguageController extends AbstractController
{
    #[Route('/language-demo', name: 'http_language_demo', methods: ['GET'])]
    public function languageDemo(Request $request): JsonResponse
    {
        $supportedLocales = ['en', 'fr', 'de', 'es', 'ar'];

        // Symfony's built-in negotiation
        $preferred = $request->getPreferredLanguage($supportedLocales);

        // All languages from Accept-Language, ordered by quality
        $languages = $request->getLanguages();

        $greetings = [
            'en' => 'Hello!',
            'fr' => 'Bonjour !',
            'de' => 'Hallo!',
            'es' => '¡Hola!',
            'ar' => 'مرحبا!',
        ];

        return $this->json([
            'accept_language_header' => $request->headers->get('Accept-Language'),
            'detected_languages' => $languages,
            'preferred' => $preferred,
            'greeting' => $greetings[$preferred] ?? $greetings['en'],
            'supported_locales' => $supportedLocales,
        ]);
    }
}
```

**Step 4:** Test it:

```bash
curl -H "Accept-Language: fr-FR,fr;q=0.9,en;q=0.8" https://127.0.0.1:8000/http/language-demo
curl -H "Accept-Language: de,en;q=0.5" https://127.0.0.1:8000/http/language-demo
curl -H "Accept-Language: ja" https://127.0.0.1:8000/http/language-demo
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Language detection"](https://symfonycasts.com/search?q=language%2Bdetection)
