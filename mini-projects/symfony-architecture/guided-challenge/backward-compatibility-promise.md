## Backward compatibility promise - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between `@api`, `@internal`, and `@deprecated` in Symfony source code?

<details><summary>Click to reveal Solution</summary>

- **`@api` (implicit in public methods)**: Covered by the BC promise. Will not change within a major version.
- **`@internal`**: NOT covered by the BC promise. Can change at any time. You should NOT depend on these.
- **`@deprecated`**: Marked for removal in the next major version. A replacement is always provided in the deprecation message. Use `SYMFONY_DEPRECATIONS_HELPER` to detect usage.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Backward compatibility promise"](https://symfonycasts.com/search?q=backward%2Bcompatibility%2Bpromise)
