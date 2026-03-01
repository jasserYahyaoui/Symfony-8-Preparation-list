## Output escaping and filters - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch templates/twig_topic/filters.html.twig
touch src/Controller/TwigTopic/FiltersController.php
```

`src/Controller/TwigTopic/FiltersController.php`:
```php
<?php

namespace App\Controller\TwigTopic;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/twig')]
class FiltersController extends AbstractController
{
    #[Route('/filters', name: 'twig_filters')]
    public function index(): Response
    {
        return $this->render('twig_topic/filters.html.twig', [
            'name' => '  jasser yahyaoui  ',
            'price' => 1234567.89,
            'description' => '<p>Bold <strong>text</strong></p>',
            'date' => new \DateTimeImmutable('2026-03-01'),
            'items' => ['banana', 'apple', 'cherry'],
        ]);
    }
}
```

`templates/twig_topic/filters.html.twig`:
```twig
{% extends 'twig_topic/base_layout.html.twig' %}

{% block title %}Filters Demo{% endblock %}

{% block body %}
<h2>Twig Filters Demo</h2>

<h3>String Filters</h3>
<ul>
    <li>upper: {{ name|upper }}</li>
    <li>lower: {{ name|lower }}</li>
    <li>capitalize: {{ name|trim|capitalize }}</li>
    <li>title: {{ name|trim|title }}</li>
    <li>trim: "{{ name|trim }}"</li>
    <li>length: {{ name|length }}</li>
</ul>

<h3>Number Filters</h3>
<ul>
    <li>number_format: {{ price|number_format(2, ',', ' ') }} €</li>
</ul>

<h3>Date Filters</h3>
<ul>
    <li>date: {{ date|date('l, F j, Y') }}</li>
    <li>date_modify: {{ date|date_modify('+7 days')|date('Y-m-d') }}</li>
</ul>

<h3>HTML Filters</h3>
<ul>
    <li>striptags: {{ description|striptags }}</li>
    <li>raw: {{ description|raw }}</li>
</ul>

<h3>Array Filters</h3>
<ul>
    <li>sort: {{ items|sort|join(', ') }}</li>
    <li>reverse: {{ items|reverse|join(', ') }}</li>
    <li>first: {{ items|first }}</li>
    <li>last: {{ items|last }}</li>
    <li>slice: {{ items|slice(0, 2)|join(', ') }}</li>
    <li>json_encode: {{ items|json_encode }}</li>
</ul>
{% endblock %}
```

**Step 4:** Visit `https://127.0.0.1:8000/twig/filters`.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Output escaping and filters"](https://symfonycasts.com/search?q=output%2Bescaping%2Band%2Bfilters)
