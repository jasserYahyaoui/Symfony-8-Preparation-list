## Router debugging - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Use `router:match` to determine which route matches `/routing/listing`, and which matches `/routing/listing/5`.

<details><summary>Click to reveal Solution</summary>

```bash
php bin/console router:match /routing/listing
# Matches: routing_listing (page=1, default)

php bin/console router:match /routing/listing/5
# Matches: routing_listing (page=5)
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Router debugging"](https://symfonycasts.com/search?q=router%2Bdebugging)
