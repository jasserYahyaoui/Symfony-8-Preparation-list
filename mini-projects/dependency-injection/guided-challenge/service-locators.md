## Service locators - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** When is `#[AutowireLocator]` better than `#[AutowireIterator]`?

<details><summary>Click to reveal Solution</summary>

Use `#[AutowireLocator]` when:
- You only need ONE service at a time (not all).
- Services are expensive to instantiate.
- You want to access services by a string key.

Use `#[AutowireIterator]` when:
- You need to process ALL tagged services (e.g., running all voters, all event handlers).

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Service locators"](https://symfonycasts.com/search?q=service%2Blocators)
