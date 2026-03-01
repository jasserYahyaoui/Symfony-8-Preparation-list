## Rendering forms with Twig - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What does `form_rest(form)` render and why should you always include it?

<details><summary>Click to reveal Solution</summary>

`form_rest(form)` renders:
1. All form fields that haven't been manually rendered yet.
2. The **CSRF token** hidden field (`_token`).
3. Any **hidden fields**.

**Why include it**: Without `form_rest()`, you might forget to render the CSRF token, causing form submissions to fail with a 419/CSRF error. It's a safety net.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Rendering forms with Twig"](https://symfonycasts.com/search?q=rendering%2Bforms%2Bwith%2Btwig)
