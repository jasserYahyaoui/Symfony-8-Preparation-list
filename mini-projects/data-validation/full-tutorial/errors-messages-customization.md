## Errors messages customization - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
#[Assert\NotBlank(message: 'Please enter your {{ label }}.')]
#[Assert\Length(
    min: 3,
    max: 50,
    minMessage: 'Your name must be at least {{ limit }} characters.',
    maxMessage: 'Your name cannot be longer than {{ limit }} characters.',
)]
public string $name = '';

#[Assert\Range(
    min: 0,
    max: 1000,
    notInRangeMessage: 'Price must be between {{ min }}€ and {{ max }}€. You entered {{ value }}€.',
)]
public float $price = 0;
```

**Available placeholders:** `{{ value }}`, `{{ limit }}`, `{{ min }}`, `{{ max }}`, `{{ label }}`.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Errors messages customization"](https://symfonycasts.com/search?q=errors%2Bmessages%2Bcustomization)
