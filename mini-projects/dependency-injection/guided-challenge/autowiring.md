## Autowiring - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What makes autowiring work? What happens if two services implement the same interface?

<details><summary>Click to reveal Solution</summary>

Autowiring works because:
1. `config/services.yaml` has `autowire: true` by default for `App\` namespace.
2. Symfony reads the constructor type-hints and finds a matching service.

If two services implement the same interface:
- Autowiring fails with an ambiguity error.
- Fix with: `#[Autowire(service: 'specific_service')]` attribute, or configure an alias in `services.yaml`, or use `#[AsAlias]`.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Autowiring"](https://symfonycasts.com/search?q=autowiring)
