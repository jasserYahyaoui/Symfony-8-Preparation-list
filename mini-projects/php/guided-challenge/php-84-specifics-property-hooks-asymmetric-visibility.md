## PHP 8.4 Specifics: Property Hooks & Asymmetric Visibility - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `Temperature` class with a property-hooked `celsius` property that auto-rejects values below -273.15 (absolute zero). Add a `toFahrenheit(): float` computed method.

**Hints:**
- Property hook on `set` should throw `\InvalidArgumentException` below -273.15.
- Formula: `F = C * 9/5 + 32`.
- Use `public protected(set) float $celsius` for asymmetric visibility.

**Testing:** `/php/temperature-demo` should show Celsius and Fahrenheit.

<details><summary>Click to reveal Solution</summary>

```php
class Temperature
{
    public protected(set) float $celsius {
        set {
            if ($value < -273.15) {
                throw new \InvalidArgumentException('Below absolute zero!');
            }
            $this->celsius = $value;
        }
    }

    public function __construct(float $celsius)
    {
        $this->celsius = $celsius;
    }

    public function toFahrenheit(): float
    {
        return round($this->celsius * 9 / 5 + 32, 2);
    }
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "PHP 8.4 Specifics: Property Hooks & Asymmetric Visibility"](https://symfonycasts.com/search?q=php%2B8.4%2Bspecifics%3A%2Bproperty%2Bhooks%2B%26%2Basymmetric%2Bvisibility)
