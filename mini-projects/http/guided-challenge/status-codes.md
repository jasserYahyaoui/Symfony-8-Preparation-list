## Status codes - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create an endpoint `/http/status-game` that returns a RANDOM status code with its text. The student must identify the family.

**Hints:**
- Use `array_rand(Response::$statusTexts)` to pick a random code.
- Return the code, its text, and the family.

**Testing:** Hit the endpoint multiple times — each time you should get a different code.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/status-game', name: 'http_status_game', methods: ['GET'])]
public function statusGame(): JsonResponse
{
    $code = array_rand(Response::$statusTexts);
    $family = match (true) {
        $code >= 100 && $code < 200 => '1xx Informational',
        $code >= 200 && $code < 300 => '2xx Success',
        $code >= 300 && $code < 400 => '3xx Redirection',
        $code >= 400 && $code < 500 => '4xx Client Error',
        $code >= 500 && $code < 600 => '5xx Server Error',
        default => 'Unknown',
    };

    return $this->json([
        'code' => $code,
        'text' => Response::$statusTexts[$code],
        'family' => $family,
    ]);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Status codes"](https://symfonycasts.com/search?q=status%2Bcodes)
