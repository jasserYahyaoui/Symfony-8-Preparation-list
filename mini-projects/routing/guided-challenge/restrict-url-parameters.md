## Restrict URL parameters - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a route `/routing/dates/{date}` that only accepts dates in `YYYY-MM-DD` format.

**Hints:**
- Regex: `\d{4}-\d{2}-\d{2}`.
- Use `requirements` parameter or inline syntax.

**Testing:** `/routing/dates/2026-03-01` → ✅, `/routing/dates/March` → ❌ 404.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/dates/{date}', name: 'routing_date', requirements: ['date' => '\d{4}-\d{2}-\d{2}'], methods: ['GET'])]
public function showDate(string $date): JsonResponse
{
    return $this->json(['date' => $date, 'parsed' => (new \DateTimeImmutable($date))->format('l, F j, Y')]);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Restrict URL parameters"](https://symfonycasts.com/search?q=restrict%2Burl%2Bparameters)
