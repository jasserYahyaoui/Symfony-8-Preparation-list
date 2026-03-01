## Tags - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between `#[AutowireIterator]` and `#[AutowireLocator]`?

<details><summary>Click to reveal Solution</summary>

- `#[AutowireIterator('tag')]`: Injects an `iterable` of ALL services with the tag. All services are instantiated when you iterate.
- `#[AutowireLocator('tag')]`: Injects a `ServiceLocator` (PSR-11 container). Services are lazy-loaded — only instantiated when you `->get()` them by ID. Better for performance when you don't need all services.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Tags"](https://symfonycasts.com/search?q=tags)
