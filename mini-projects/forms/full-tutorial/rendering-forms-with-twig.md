## Rendering forms with Twig - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```twig
{# Full automatic rendering #}
{{ form(form) }}

{# Manual rendering (full control) #}
{{ form_start(form) }}
    {{ form_errors(form) }}           {# Global errors #}

    {{ form_label(form.name) }}       {# Just the label #}
    {{ form_widget(form.name) }}      {# Just the input #}
    {{ form_errors(form.name) }}      {# Field-level errors #}
    {{ form_help(form.name) }}        {# Help text #}

    {{ form_row(form.email) }}        {# Label + Widget + Errors in one #}

    {{ form_rest(form) }}             {# Renders remaining fields + CSRF #}
{{ form_end(form) }}
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Rendering forms with Twig"](https://symfonycasts.com/search?q=rendering%2Bforms%2Bwith%2Btwig)
