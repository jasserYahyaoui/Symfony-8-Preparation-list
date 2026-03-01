## Translations and internationalization - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```bash
composer require translation
mkdir -p translations
touch translations/messages.en.yaml
touch translations/messages.fr.yaml
touch templates/twig_topic/i18n.html.twig
```

`translations/messages.en.yaml`:
```yaml
welcome: Welcome
greeting: "Hello, %name%!"
items_count: "{0}No items|{1}One item|]1,Inf[%count% items"
```

`translations/messages.fr.yaml`:
```yaml
welcome: Bienvenue
greeting: "Bonjour, %name% !"
items_count: "{0}Aucun élément|{1}Un élément|]1,Inf[%count% éléments"
```

`templates/twig_topic/i18n.html.twig`:
```twig
{% extends 'twig_topic/base_layout.html.twig' %}
{% block body %}
<h2>{{ 'welcome'|trans }}</h2>
<p>{{ 'greeting'|trans({'%name%': 'Jasser'}) }}</p>
<p>{{ 'items_count'|trans({'%count%': 0}) }}</p>
<p>{{ 'items_count'|trans({'%count%': 1}) }}</p>
<p>{{ 'items_count'|trans({'%count%': 42}) }}</p>
{% endblock %}
```

**Step 4:** Visit the page. Change the locale in `config/packages/translation.yaml` to `fr` and compare.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Translations and internationalization"](https://symfonycasts.com/search?q=translations%2Band%2Binternationalization)
