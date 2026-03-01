## Client object - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the difference between `static::createClient()` and `KernelTestCase::bootKernel()`?

<details><summary>Click to reveal Solution</summary>

- `createClient()` (from `WebTestCase`): Boots the kernel AND creates an HTTP client for making simulated requests. Used for functional/HTTP tests.
- `bootKernel()` (from `KernelTestCase`): Boots the kernel and gives access to the container, but NO HTTP client. Used for integration tests that need services but don't test HTTP endpoints.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Client object"](https://symfonycasts.com/search?q=client%2Bobject)
