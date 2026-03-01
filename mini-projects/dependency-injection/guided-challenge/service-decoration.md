## Service decoration - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between decoration and extending a class? When should you use decoration?

<details><summary>Click to reveal Solution</summary>

- **Extending**: Creates a new class. You must change all references from parent to child.
- **Decoration**: Wraps the original service transparently. All consumers still type-hint the original class but get the decorator. The original remains unchanged.
- **Use decoration when**: You want to add behavior (logging, caching, auditing) to a service without modifying it, especially third-party services you can't change.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Service decoration"](https://symfonycasts.com/search?q=service%2Bdecoration)
