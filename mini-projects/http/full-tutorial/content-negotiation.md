## Content negotiation - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create the controller.

```bash
touch src/Controller/HttpTopic/ContentNegotiationController.php
```

**Step 2:** Place in `src/Controller/HttpTopic/ContentNegotiationController.php`.

**Step 3:**

```php
<?php

namespace App\Controller\HttpTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/http')]
class ContentNegotiationController extends AbstractController
{
    #[Route('/negotiate', name: 'http_negotiate', methods: ['GET'])]
    public function negotiate(Request $request): Response
    {
        $data = [
            'id' => 1,
            'name' => 'Symfony 8.0 Certification',
            'topics' => 15,
        ];

        // Symfony's getPreferredFormat checks the Accept header
        $format = $request->getPreferredFormat('json');

        return match ($format) {
            'json' => $this->json($data),
            'xml' => new Response(
                $this->arrayToXml($data),
                Response::HTTP_OK,
                ['Content-Type' => 'application/xml']
            ),
            'html' => new Response(
                '<h1>' . $data['name'] . '</h1><p>Topics: ' . $data['topics'] . '</p>',
                Response::HTTP_OK,
                ['Content-Type' => 'text/html']
            ),
            default => $this->json($data),
        };
    }

    private function arrayToXml(array $data, string $root = 'response'): string
    {
        $xml = new \SimpleXMLElement("<{$root}/>");
        foreach ($data as $key => $value) {
            $xml->addChild((string) $key, htmlspecialchars((string) $value));
        }
        return $xml->asXML();
    }
}
```

**Step 4:** Test with different `Accept` headers:

```bash
curl -H "Accept: application/json" https://127.0.0.1:8000/http/negotiate
curl -H "Accept: application/xml" https://127.0.0.1:8000/http/negotiate
curl -H "Accept: text/html" https://127.0.0.1:8000/http/negotiate
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Content negotiation"](https://symfonycasts.com/search?q=content%2Bnegotiation)
