## Unit tests with PHPUnit - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


**Step 1:** Create a service to test and its test file.

```bash
mkdir -p src/Service/TestsTopic
touch src/Service/TestsTopic/Calculator.php
mkdir -p tests/Service/TestsTopic
touch tests/Service/TestsTopic/CalculatorTest.php
```

**Step 2:** Place files as shown above.

**Step 3:**

`src/Service/TestsTopic/Calculator.php`:
```php
<?php

namespace App\Service\TestsTopic;

class Calculator
{
    public function add(float $a, float $b): float
    {
        return $a + $b;
    }

    public function divide(float $a, float $b): float
    {
        if ($b === 0.0) {
            throw new \DivisionByZeroError('Division by zero');
        }
        return $a / $b;
    }

    public function factorial(int $n): int
    {
        if ($n < 0) {
            throw new \InvalidArgumentException('Negative number');
        }
        if ($n <= 1) return 1;
        return $n * $this->factorial($n - 1);
    }
}
```

`tests/Service/TestsTopic/CalculatorTest.php`:
```php
<?php

namespace App\Tests\Service\TestsTopic;

use App\Service\TestsTopic\Calculator;
use PHPUnit\Framework\TestCase;

class CalculatorTest extends TestCase
{
    private Calculator $calculator;

    protected function setUp(): void
    {
        $this->calculator = new Calculator();
    }

    public function testAdd(): void
    {
        $this->assertSame(5.0, $this->calculator->add(2, 3));
        $this->assertSame(0.0, $this->calculator->add(-1, 1));
    }

    public function testDivide(): void
    {
        $this->assertSame(2.0, $this->calculator->divide(10, 5));
    }

    public function testDivideByZeroThrowsException(): void
    {
        $this->expectException(\DivisionByZeroError::class);
        $this->calculator->divide(10, 0);
    }

    public function testFactorial(): void
    {
        $this->assertSame(1, $this->calculator->factorial(0));
        $this->assertSame(1, $this->calculator->factorial(1));
        $this->assertSame(120, $this->calculator->factorial(5));
    }

    public function testFactorialNegativeThrows(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->calculator->factorial(-1);
    }

    /**
     * @dataProvider additionProvider
     */
    public function testAddWithDataProvider(float $a, float $b, float $expected): void
    {
        $this->assertSame($expected, $this->calculator->add($a, $b));
    }

    public static function additionProvider(): array
    {
        return [
            'positive numbers' => [1, 2, 3.0],
            'negative numbers' => [-1, -2, -3.0],
            'zero' => [0, 0, 0.0],
            'mixed' => [-5, 10, 5.0],
        ];
    }
}
```

**Step 4:** Run the tests:

```bash
php bin/phpunit tests/Service/TestsTopic/CalculatorTest.php
```


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Unit tests with PHPUnit"](https://symfonycasts.com/search?q=unit%2Btests%2Bwith%2Bphpunit)
