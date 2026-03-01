## Macros and include - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `card` macro that accepts `title`, `body`, and `footer` and renders a styled card.

<details><summary>Click to reveal Solution</summary>

```twig
{% macro card(title, body, footer) %}
<div style="border:1px solid #ddd;border-radius:8px;overflow:hidden;margin:10px 0;">
    <div style="background:#f5f5f5;padding:12px;font-weight:bold;">{{ title }}</div>
    <div style="padding:12px;">{{ body }}</div>
    {% if footer %}<div style="background:#fafafa;padding:8px 12px;font-size:0.9em;">{{ footer }}</div>{% endif %}
</div>
{% endmacro %}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Macros and include"](https://symfonycasts.com/search?q=macros%2Band%2Binclude)
