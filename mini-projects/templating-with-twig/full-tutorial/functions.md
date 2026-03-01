## Functions - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch templates/twig_topic/functions.html.twig
touch src/Controller/TwigTopic/FunctionsController.php
```

`src/Controller/TwigTopic/FunctionsController.php`:
```php
<?php

namespace App\Controller\TwigTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/twig')]
class FunctionsController extends AbstractController
{
    #[Route('/functions', name: 'twig_functions')]
    public function index(): Response
    {
        return $this->render('twig_topic/functions.html.twig', [
            'user' => ['name' => 'Jasser', 'role' => 'student'],
        ]);
    }
}
```

`templates/twig_topic/functions.html.twig`:
```twig
{% extends 'twig_topic/base_layout.html.twig' %}
{% block body %}
<h2>Twig Functions Demo</h2>

<h3>URL Functions</h3>
<ul>
    <li>path(): <a href="{{ path('twig_filters') }}">Filters page (relative)</a></li>
    <li>url(): <a href="{{ url('twig_filters') }}">Filters page (absolute)</a></li>
</ul>

<h3>Debug</h3>
<pre>{{ dump(user) }}</pre>

<h3>Range</h3>
<ul>
{% for i in range(1, 5) %}
    <li>Item {{ i }}</li>
{% endfor %}
</ul>

<h3>Constant</h3>
<p>PHP_INT_MAX = {{ constant('PHP_INT_MAX') }}</p>
{% endblock %}
```

**Step 4:** Visit `https://127.0.0.1:8000/twig/functions`.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Functions"](https://symfonycasts.com/search?q=functions)
