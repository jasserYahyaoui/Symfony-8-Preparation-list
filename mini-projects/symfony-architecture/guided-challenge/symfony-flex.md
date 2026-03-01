## Symfony Flex - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Install the `mailer` component via Flex alias and verify the recipe created the configuration file.

**Hints:**
- `composer require mailer` (Flex alias).
- Check `config/packages/mailer.yaml` exists after installation.
- The bundle should appear in `config/bundles.php`.

**Testing:** `cat config/packages/mailer.yaml` should show a valid config. `grep Mailer config/bundles.php` should find the bundle.

<details><summary>Click to reveal Solution</summary>

```bash
composer require mailer
cat config/packages/mailer.yaml
grep -i mailer config/bundles.php
```

Expected: The mailer.yaml file is auto-created by the Flex recipe and the bundle is auto-registered.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Symfony Flex"](https://symfonycasts.com/search?q=symfony%2Bflex)
