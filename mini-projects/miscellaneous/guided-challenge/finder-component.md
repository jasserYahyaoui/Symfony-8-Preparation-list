## Finder component - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Find all files modified in the last 24 hours in the `var/` directory.

<details><summary>Click to reveal Solution</summary>

```php
$finder = new Finder();
$finder->files()
    ->in($this->getParameter('kernel.project_dir') . '/var')
    ->date('since yesterday');
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Finder component"](https://symfonycasts.com/search?q=finder%2Bcomponent)
