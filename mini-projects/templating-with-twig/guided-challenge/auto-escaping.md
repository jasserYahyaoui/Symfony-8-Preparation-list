## Auto escaping - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What happens if you render `{{ user_input }}` vs `{{ user_input|raw }}`? When is `|raw` acceptable?

<details><summary>Click to reveal Solution</summary>

- `{{ user_input }}`: Auto-escaped. Special HTML characters (`<`, `>`, `&`, `"`, `'`) are converted to HTML entities. **SAFE.**
- `{{ user_input|raw }}`: No escaping. HTML is rendered as-is. **DANGEROUS** unless you control the content (e.g., content from a trusted WYSIWYG editor after server-side sanitization).
- The `|raw` filter is acceptable ONLY for trusted content that has been sanitized server-side.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Auto escaping"](https://symfonycasts.com/search?q=auto%2Bescaping)
