## Validation groups - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
class UserData
{
    #[Assert\NotBlank(groups: ['registration', 'profile'])]
    #[Assert\Length(min: 2, groups: ['registration', 'profile'])]
    public string $name = '';

    #[Assert\NotBlank(groups: ['registration'])]
    #[Assert\Email(groups: ['registration'])]
    public string $email = '';

    #[Assert\NotBlank(groups: ['registration'])]
    #[Assert\Length(min: 8, groups: ['registration'])]
    public string $password = '';

    #[Assert\NotBlank(groups: ['profile'])]
    public string $bio = '';
}
```

```php
// Validate for registration context only
$violations = $validator->validate($data, null, ['registration']);

// Validate for profile update only
$violations = $validator->validate($data, null, ['profile']);
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Validation groups"](https://symfonycasts.com/search?q=validation%2Bgroups)
