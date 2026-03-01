## Output escaping and filters - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Display a price with a `|number_format` filter, a date with a custom format, and a list sorted alphabetically.

<details><summary>Click to reveal Solution</summary>

```twig
Price: {{ 99.5|number_format(2, '.', ',') }} USD
Date: {{ "now"|date("d/m/Y H:i") }}
Sorted: {{ ['zebra', 'ant', 'mango']|sort|join(', ') }}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Output escaping and filters"](https://symfonycasts.com/search?q=output%2Bescaping%2Band%2Bfilters)
