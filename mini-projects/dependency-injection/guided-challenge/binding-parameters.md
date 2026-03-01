## Binding parameters - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Inject the `APP_SECRET` env variable into a service using `#[Autowire]`.

<details><summary>Click to reveal Solution</summary>

```php
public function __construct(
    #[Autowire('%env(APP_SECRET)%')] private readonly string $appSecret,
) {}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Binding parameters"](https://symfonycasts.com/search?q=binding%2Bparameters)
