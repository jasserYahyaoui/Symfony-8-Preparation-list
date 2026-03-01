## Validation scopes - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a DTO where `startDate` must be before `endDate` using `#[Assert\Expression]`.

<details><summary>Click to reveal Solution</summary>

```php
#[Assert\Expression(
    expression: 'this.startDate < this.endDate',
    message: 'Start date must be before end date.',
)]
class DateRangeData
{
    #[Assert\NotNull]
    public ?\DateTimeImmutable $startDate = null;

    #[Assert\NotNull]
    public ?\DateTimeImmutable $endDate = null;
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Validation scopes"](https://symfonycasts.com/search?q=validation%2Bscopes)
