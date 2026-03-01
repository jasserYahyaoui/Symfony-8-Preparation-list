## Compiler passes - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** When should you use a compiler pass vs. `#[AutowireIterator]`?

<details><summary>Click to reveal Solution</summary>

- **`#[AutowireIterator]`**: Simple collection of tagged services. Use when you just need to iterate.
- **Compiler pass**: Complex manipulation at build time — reordering services, modifying definitions, conditional registration, replacing arguments. Use when you need full control over the container.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Compiler passes"](https://symfonycasts.com/search?q=compiler%2Bpasses)
