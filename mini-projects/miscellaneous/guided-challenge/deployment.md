## Deployment - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Why must you run `cache:warmup` in production? What happens without it?

<details><summary>Click to reveal Solution</summary>

`cache:warmup` pre-compiles:
- The DI container (services)
- Routes
- Twig templates
- Annotations/attributes

Without it: The first request triggers compilation, causing a **slow first request** (cold start). With warmup: All requests are fast because everything is pre-compiled.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Deployment"](https://symfonycasts.com/search?q=deployment)
