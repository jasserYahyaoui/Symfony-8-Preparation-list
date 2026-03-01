## Template inheritance - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch templates/twig_topic/base_layout.html.twig
touch templates/twig_topic/inheritance.html.twig
touch src/Controller/TwigTopic/InheritanceController.php
```

`templates/twig_topic/base_layout.html.twig`:
```twig
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{% block title %}Symfony Sandbox{% endblock %}</title>
    <style>
        body { font-family: sans-serif; margin: 2rem; }
        .header { background: #333; color: white; padding: 1rem; }
        .content { padding: 1rem; }
        .footer { background: #eee; padding: 1rem; margin-top: 2rem; }
    </style>
    {% block stylesheets %}{% endblock %}
</head>
<body>
    <div class="header">
        {% block header %}<h1>Symfony 8 Sandbox</h1>{% endblock %}
    </div>

    <div class="content">
        {% block body %}{% endblock %}
    </div>

    <div class="footer">
        {% block footer %}&copy; {{ "now"|date("Y") }} Certification Sandbox{% endblock %}
    </div>

    {% block javascripts %}{% endblock %}
</body>
</html>
```

`templates/twig_topic/inheritance.html.twig`:
```twig
{% extends 'twig_topic/base_layout.html.twig' %}

{% block title %}Inheritance Demo | {{ parent() }}{% endblock %}

{% block body %}
    <h2>Template Inheritance Demo</h2>
    <p>This content is defined in the child template.</p>
    <p>The header and footer come from the parent layout.</p>
{% endblock %}

{% block footer %}
    {{ parent() }}
    <p>Extra footer content from child template.</p>
{% endblock %}
```

`src/Controller/TwigTopic/InheritanceController.php`:
```php
<?php

namespace App\Controller\TwigTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/twig')]
class InheritanceController extends AbstractController
{
    #[Route('/inheritance', name: 'twig_inheritance')]
    public function index(): Response
    {
        return $this->render('twig_topic/inheritance.html.twig');
    }
}
```

**Step 4:** Visit `https://127.0.0.1:8000/twig/inheritance` — see the full layout with inherited blocks.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Template inheritance"](https://symfonycasts.com/search?q=template%2Binheritance)
