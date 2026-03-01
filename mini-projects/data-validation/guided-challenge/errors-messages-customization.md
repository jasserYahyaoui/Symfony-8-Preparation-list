## Errors messages customization - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a custom error message for an email constraint that includes the invalid value.

<details><summary>Click to reveal Solution</summary>

```php
#[Assert\Email(message: 'The address "{{ value }}" is not a valid email.')]
public string $email = '';
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Errors messages customization"](https://symfonycasts.com/search?q=errors%2Bmessages%2Bcustomization)
