## Cookies - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `/http/visit-counter` endpoint that uses a cookie to track how many times the user has visited. Each visit increments the counter.

**Hints:**
- Read `$request->cookies->getInt('visits', 0)`.
- Increment by 1.
- Set a new cookie with the updated value.

**Testing:** Hit the endpoint 3 times — the counter should go 1 → 2 → 3.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/visit-counter', name: 'http_visit_counter', methods: ['GET'])]
public function visitCounter(Request $request): Response
{
    $visits = $request->cookies->getInt('visits', 0) + 1;

    $response = $this->json(['visits' => $visits]);
    $response->headers->setCookie(
        Cookie::create('visits')
            ->withValue((string) $visits)
            ->withExpires(new \DateTimeImmutable('+1 year'))
            ->withPath('/')
    );

    return $response;
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Cookies"](https://symfonycasts.com/search?q=cookies)
