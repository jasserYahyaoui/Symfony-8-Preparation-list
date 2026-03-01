## Code organization - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Examine the default project structure:

```bash
ls -la src/
ls -la config/
ls -la config/packages/
ls -la templates/
ls -la public/
```

**Step 2:** This exercise is exploratory — no code to write. Understand this structure:

```
symfony-8-certif-sandbox/
├── bin/
│   └── console         # CLI entry point
├── config/
│   ├── bundles.php      # Auto-registered bundles (via Flex)
│   ├── packages/        # Per-package configuration
│   ├── routes/          # Route loading config
│   ├── routes.yaml      # Main route config
│   └── services.yaml    # Service container config
├── public/
│   └── index.php        # Web entry point (Front Controller)
├── src/
│   ├── Controller/      # HTTP Controllers
│   ├── Command/         # CLI Commands
│   ├── Entity/          # Domain entities (if using Doctrine)
│   ├── EventSubscriber/ # Event subscribers
│   ├── Service/         # Business logic services
│   └── Kernel.php       # Application kernel
├── templates/           # Twig templates
├── tests/               # PHPUnit tests
├── var/
│   ├── cache/           # Compiled container, routes, etc.
│   └── log/             # Application logs
└── vendor/              # Composer dependencies
```

**Step 3:** Verify the key files:

```bash
cat config/bundles.php
head -20 config/services.yaml
cat src/Kernel.php
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Code organization"](https://symfonycasts.com/search?q=code%2Borganization)
