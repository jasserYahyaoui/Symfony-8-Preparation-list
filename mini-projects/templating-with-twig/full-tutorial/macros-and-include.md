## Macros and include - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
touch templates/twig_topic/_macros.html.twig
touch templates/twig_topic/_alert.html.twig
touch templates/twig_topic/macros_demo.html.twig
```

`templates/twig_topic/_macros.html.twig`:
```twig
{% macro badge(text, color) %}
    <span style="background:{{ color }};color:white;padding:2px 8px;border-radius:4px;">
        {{ text }}
    </span>
{% endmacro %}

{% macro button(label, type) %}
    <button type="{{ type|default('button') }}" style="padding:8px 16px;">{{ label }}</button>
{% endmacro %}
```

`templates/twig_topic/_alert.html.twig`:
```twig
<div style="border:1px solid {{ color|default('#333') }};padding:10px;margin:5px 0;border-radius:4px;">
    <strong>{{ title }}</strong>: {{ message }}
</div>
```

`templates/twig_topic/macros_demo.html.twig`:
```twig
{% extends 'twig_topic/base_layout.html.twig' %}

{% import 'twig_topic/_macros.html.twig' as ui %}

{% block body %}
<h2>Macros & Include</h2>

<h3>Macros (reusable functions)</h3>
<p>Status: {{ ui.badge('Active', '#22c55e') }} {{ ui.badge('Beta', '#f59e0b') }}</p>
<p>{{ ui.button('Submit', 'submit') }} {{ ui.button('Cancel') }}</p>

<h3>Include (reusable partials)</h3>
{% include 'twig_topic/_alert.html.twig' with { title: 'Success', message: 'Saved!', color: 'green' } %}
{% include 'twig_topic/_alert.html.twig' with { title: 'Warning', message: 'Unsaved changes', color: 'orange' } %}
{% endblock %}
```

**Step 4:** Create a controller route and visit in browser.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Macros and include"](https://symfonycasts.com/search?q=macros%2Band%2Binclude)
