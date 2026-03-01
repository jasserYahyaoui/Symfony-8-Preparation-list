## Internationalization with ICU - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


ICU message format supports pluralization:

```yaml
# translations/messages+intl-icu.en.yaml
num_of_apples: >
    {apples, plural,
        =0 {No apples}
        one {# apple}
        other {# apples}
    }
```

Usage in Twig:
```twig
{{ 'num_of_apples'|trans({apples: 5}) }}
{# Output: "5 apples" #}
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Internationalization with ICU"](https://symfonycasts.com/search?q=internationalization%2Bwith%2Bicu)
