## Code organization - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Without looking, describe the purpose of these 5 files: `public/index.php`, `config/bundles.php`, `config/services.yaml`, `src/Kernel.php`, `.env`.

<details><summary>Click to reveal Solution</summary>

- **`public/index.php`**: Front controller — the single entry point for all HTTP requests. Creates the Kernel, handles the Request, sends the Response.
- **`config/bundles.php`**: Returns an array of registered bundles. Auto-managed by Symfony Flex.
- **`config/services.yaml`**: Main service container configuration. Defines autowiring rules, service bindings, and parameter overrides.
- **`src/Kernel.php`**: The application's Kernel class. Extends `BaseKernel`, registers bundles, and loads container configuration.
- **`.env`**: Default environment variables. Defines `APP_ENV`, `APP_SECRET`, and connection strings. Overridden by `.env.local`.

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Code organization"](https://symfonycasts.com/search?q=code%2Borganization)
