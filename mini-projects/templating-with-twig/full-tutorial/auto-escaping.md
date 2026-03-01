## Auto escaping - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create the controller and template.

```bash
touch src/Controller/TwigTopic/EscapingController.php
mkdir -p templates/twig_topic
touch templates/twig_topic/escaping.html.twig
```

**Step 3:**

`src/Controller/TwigTopic/EscapingController.php`:
```php
<?php

namespace App\Controller\TwigTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/twig')]
class EscapingController extends AbstractController
{
    #[Route('/escaping', name: 'twig_escaping')]
    public function index(): Response
    {
        return $this->render('twig_topic/escaping.html.twig', [
            'safe_text' => 'Hello, World!',
            'dangerous_text' => '<script>alert("XSS!")</script>',
            'html_content' => '<strong>Bold</strong> and <em>italic</em>',
        ]);
    }
}
```

`templates/twig_topic/escaping.html.twig`:
```twig
<!DOCTYPE html>
<html><body>
<h1>Auto-Escaping Demo</h1>

<h2>1. Auto-escaped (default — SAFE):</h2>
<p>{{ dangerous_text }}</p>
{# Renders as: &lt;script&gt;alert("XSS!")&lt;/script&gt; #}

<h2>2. Raw filter (DANGEROUS — intentional):</h2>
<p>{{ html_content|raw }}</p>
{# Renders as actual bold and italic HTML #}

<h2>3. Escaping in different contexts:</h2>
<p>HTML: {{ dangerous_text|e('html') }}</p>
<p>JS:   {{ dangerous_text|e('js') }}</p>
<p>URL:  {{ dangerous_text|e('url') }}</p>

</body></html>
```

**Step 4:** Visit `https://127.0.0.1:8000/twig/escaping` in the browser.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Auto escaping"](https://symfonycasts.com/search?q=auto%2Bescaping)
