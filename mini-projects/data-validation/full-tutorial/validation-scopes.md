## Validation scopes - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

#[Assert\Expression(
    expression: 'this.passwordConfirm === this.password',
    message: 'Passwords do not match.',
)]
class PasswordChangeData
{
    // Property-level constraint
    #[Assert\NotBlank]
    #[Assert\Length(min: 8)]
    public string $password = '';

    #[Assert\NotBlank]
    public string $passwordConfirm = '';

    // Getter-level constraint (Assert\IsTrue on a method)
    #[Assert\IsTrue(message: 'Password cannot be the same as username.')]
    public function isPasswordSafe(): bool
    {
        return $this->password !== 'admin123';
    }
}
```

**Key concepts:**
- **Property level**: Constraints on individual properties.
- **Class level**: `#[Assert\Expression]` or `#[Assert\Callback]` on the class — validates relationships between fields.
- **Getter level**: `#[Assert\IsTrue]` / `#[Assert\IsFalse]` on a method — calls the method and validates the return value.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Validation scopes"](https://symfonycasts.com/search?q=validation%2Bscopes)
