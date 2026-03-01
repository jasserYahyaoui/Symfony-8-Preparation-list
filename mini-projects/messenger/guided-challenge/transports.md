## Transports - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** What is the default transport if no routing is configured? How do you run a worker?

<details><summary>Click to reveal Solution</summary>

- **Default**: If no routing is configured, messages are handled **synchronously** (in the same request).
- **Worker**: `php bin/console messenger:consume <transport_name> -vv`.
- Multiple transports: `php bin/console messenger:consume async priority_high -vv`.
- As a daemon: Use Supervisor or systemd to keep the worker running.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Transports"](https://symfonycasts.com/search?q=transports)
