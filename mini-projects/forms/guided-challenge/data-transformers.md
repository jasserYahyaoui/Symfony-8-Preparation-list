## Data transformers - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between `addModelTransformer()` and `addViewTransformer()`?

<details><summary>Click to reveal Solution</summary>

- **Model Transformer**: Converts between the **model data** (what your PHP code uses) and the **normalized data** (what the form works with internally).
- **View Transformer**: Converts between the **normalized data** and the **view data** (what the user sees in the HTML).

Chain: Model ↔ (model transformer) ↔ Norm ↔ (view transformer) ↔ View.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Data transformers"](https://symfonycasts.com/search?q=data%2Btransformers)
