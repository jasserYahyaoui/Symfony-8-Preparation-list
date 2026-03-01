## Form themes - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


In `config/packages/twig.yaml`:
```yaml
twig:
    form_themes:
        - 'bootstrap_5_layout.html.twig'
        # Or: 'tailwind_2_layout.html.twig'
```

Or apply per-template:
```twig
{% form_theme form 'bootstrap_5_layout.html.twig' %}
{{ form(form) }}
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Form themes"](https://symfonycasts.com/search?q=form%2Bthemes)
