## Object Oriented Programming - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Add a `PremiumProduct` class that extends `Product`, adds a `warrantyYears` property (readonly, default 2), and override a method to include that info.

**Hints:**
- Use constructor promotion with `public readonly int $warrantyYears = 2`.
- Call `parent::__construct()`.
- Add a `getWarrantyInfo(): string` method.

**Testing:** Add a `PremiumProduct` to the service, hit `/php/oop-demo`, and verify the warranty info appears.

<details><summary>Click to reveal Solution</summary>

```php
class PremiumProduct extends Product
{
    public function __construct(
        string $name,
        float $price,
        public readonly int $warrantyYears = 2,
        bool $active = true,
    ) {
        parent::__construct($name, $price, $active);
    }

    public function getWarrantyInfo(): string
    {
        return sprintf('%s has a %d-year warranty', $this->name, $this->warrantyYears);
    }
}
```

Add to `getProducts()`:
```php
new PremiumProduct('Laptop', 1299.99, 3),
```

Update `getProductSummary()` mapping:
```php
'warranty' => $p instanceof PremiumProduct ? $p->getWarrantyInfo() : null,
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Object Oriented Programming"](https://symfonycasts.com/search?q=object%2Boriented%2Bprogramming)
