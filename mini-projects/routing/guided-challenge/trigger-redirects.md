## Trigger redirects - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a route `/legacy/about` that permanently redirects to `/architecture/best-practices/visitor`.

<details><summary>Click to reveal Solution</summary>

In `config/routes.yaml`:
```yaml
routing_legacy_about:
    path: /legacy/about
    controller: Symfony\Bundle\FrameworkBundle\Controller\RedirectController
    defaults:
        route: arch_best_practices
        name: visitor
        permanent: true
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Trigger redirects"](https://symfonycasts.com/search?q=trigger%2Bredirects)
