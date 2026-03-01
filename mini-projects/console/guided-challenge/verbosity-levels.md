## Verbosity levels - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Run a command with `-q`, `-v`, `-vv`, `-vvv` and observe the output difference.

<details><summary>Click to reveal Solution</summary>

```bash
php bin/console app:demo-output -q   # Only errors
php bin/console app:demo-output       # Normal output
php bin/console app:demo-output -v    # Extra info
php bin/console app:demo-output -vv   # Detailed info
php bin/console app:demo-output -vvv  # Debug info
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Verbosity levels"](https://symfonycasts.com/search?q=verbosity%2Blevels)
