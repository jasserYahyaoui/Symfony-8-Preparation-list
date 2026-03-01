## Internationalization with ICU - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between `messages.en.yaml` and `messages+intl-icu.en.yaml`?

<details><summary>Click to reveal Solution</summary>

- `messages.en.yaml`: Uses Symfony's default message format. Pluralization via `|` pipe: `{0}none|{1}one|]1,Inf[many`.
- `messages+intl-icu.en.yaml`: Uses **ICU MessageFormat** (industry standard). Pluralization via `{count, plural, ...}`. Supports: select, number formatting, date formatting, and more. Recommended for new projects.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Internationalization with ICU"](https://symfonycasts.com/search?q=internationalization%2Bwith%2Bicu)
