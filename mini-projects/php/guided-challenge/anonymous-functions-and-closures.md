## Anonymous functions and closures - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `Pipeline` class that chains closures. E.g., `$pipeline->pipe(fn($v) => $v * 2)->pipe(fn($v) => $v + 10)->process(5)` → returns `20`.

**Hints:**
- Store closures in an array property.
- `pipe(\Closure $fn): static` adds to the array and returns `$this`.
- `process(mixed $value): mixed` applies each closure sequentially via `array_reduce`.

**Testing:** `/php/pipeline-demo` should return `{"input": 5, "output": 20}`.

<details><summary>Click to reveal Solution</summary>

```php
class Pipeline
{
    /** @var \Closure[] */
    private array $stages = [];

    public function pipe(\Closure $fn): static
    {
        $this->stages[] = $fn;
        return $this;
    }

    public function process(mixed $value): mixed
    {
        return array_reduce(
            $this->stages,
            fn(mixed $carry, \Closure $fn) => $fn($carry),
            $value,
        );
    }
}
```

Controller method:
```php
#[Route('/php/pipeline-demo', name: 'php_pipeline_demo', methods: ['GET'])]
public function pipeline(): JsonResponse
{
    $pipeline = new Pipeline();
    $result = $pipeline
        ->pipe(fn(int $v) => $v * 2)
        ->pipe(fn(int $v) => $v + 10)
        ->process(5);

    return $this->json(['input' => 5, 'output' => $result]);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Anonymous functions and closures"](https://symfonycasts.com/search?q=anonymous%2Bfunctions%2Band%2Bclosures)
