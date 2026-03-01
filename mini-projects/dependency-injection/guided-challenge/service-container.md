## Service container - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Use `debug:container` to find the service ID for `LoggerInterface`. What is its class?

<details><summary>Click to reveal Solution</summary>

```bash
php bin/console debug:container LoggerInterface
# Or
php bin/console debug:autowiring Logger
```

The service ID is `Psr\Log\LoggerInterface` (or `logger`), class is `Symfony\Bridge\Monolog\Logger`.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Service container"](https://symfonycasts.com/search?q=service%2Bcontainer)
