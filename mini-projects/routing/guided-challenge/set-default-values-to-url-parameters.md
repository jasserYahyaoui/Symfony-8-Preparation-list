## Set default values to URL parameters - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create `/routing/archive/{year}/{month}` where `month` defaults to the current month, and `year` defaults to the current year.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/archive/{year}/{month}', name: 'routing_archive',
    requirements: ['year' => '\d{4}', 'month' => '\d{1,2}'],
    defaults: ['year' => null, 'month' => null],
    methods: ['GET'])]
public function archive(?int $year, ?int $month): JsonResponse
{
    $year ??= (int) date('Y');
    $month ??= (int) date('m');
    return $this->json(['year' => $year, 'month' => $month]);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Set default values to URL parameters"](https://symfonycasts.com/search?q=set%2Bdefault%2Bvalues%2Bto%2Burl%2Bparameters)
