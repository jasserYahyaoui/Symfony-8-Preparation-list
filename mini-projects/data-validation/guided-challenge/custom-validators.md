## Custom validators - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `#[ContainsAlphanumeric]` constraint that ensures a string contains only letters and numbers.

<details><summary>Click to reveal Solution</summary>

`src/Validator/ContainsAlphanumeric.php`:
```php
#[\Attribute]
class ContainsAlphanumeric extends Constraint
{
    public string $message = '"{{ value }}" must contain only alphanumeric characters.';
}
```

`src/Validator/ContainsAlphanumericValidator.php`:
```php
class ContainsAlphanumericValidator extends ConstraintValidator
{
    public function validate(mixed $value, Constraint $constraint): void
    {
        if (null === $value || '' === $value) return;
        if (!preg_match('/^[a-zA-Z0-9]+$/', $value)) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ value }}', $value)
                ->addViolation();
        }
    }
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Custom validators"](https://symfonycasts.com/search?q=custom%2Bvalidators)
