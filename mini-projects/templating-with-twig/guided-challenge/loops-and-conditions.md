## Loops and conditions - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Loop over products, skip inactive ones with `{% if %}`, and show "No products" if the list is empty using `{% for/else %}`.

<details><summary>Click to reveal Solution</summary>

```twig
{% for product in products if product.active %}
    <p>{{ product.name }} — {{ product.price }}€</p>
{% else %}
    <p>No active products found.</p>
{% endfor %}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Loops and conditions"](https://symfonycasts.com/search?q=loops%2Band%2Bconditions)
