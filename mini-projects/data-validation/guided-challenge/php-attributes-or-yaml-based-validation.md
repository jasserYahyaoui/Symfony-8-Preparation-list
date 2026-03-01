## PHP attributes or YAML-based validation - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Add an `#[Assert\Choice]` constraint for a `role` field that only accepts `user`, `admin`, `moderator`.

<details><summary>Click to reveal Solution</summary>

```php
#[Assert\NotBlank]
#[Assert\Choice(choices: ['user', 'admin', 'moderator'], message: 'Invalid role "{{ value }}".')]
public string $role = 'user';
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "PHP attributes or YAML-based validation"](https://symfonycasts.com/search?q=php%2Battributes%2Bor%2Byaml-based%2Bvalidation)
