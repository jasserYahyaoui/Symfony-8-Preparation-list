## Unit tests with PHPUnit - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Add a `percentage(float $value, float $total): float` method to `Calculator` and write a test with `@dataProvider`.

<details><summary>Click to reveal Solution</summary>

```php
// In Calculator:
public function percentage(float $value, float $total): float
{
    if ($total === 0.0) throw new \DivisionByZeroError();
    return round(($value / $total) * 100, 2);
}

// In test:
/**
 * @dataProvider percentageProvider
 */
public function testPercentage(float $value, float $total, float $expected): void
{
    $this->assertSame($expected, $this->calculator->percentage($value, $total));
}

public static function percentageProvider(): array
{
    return [
        [50, 100, 50.0],
        [1, 3, 33.33],
        [200, 100, 200.0],
    ];
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Unit tests with PHPUnit"](https://symfonycasts.com/search?q=unit%2Btests%2Bwith%2Bphpunit)
