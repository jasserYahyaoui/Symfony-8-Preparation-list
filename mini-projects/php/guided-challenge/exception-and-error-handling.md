## Exception and error handling - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `RateLimitExceededException` that extends `\RuntimeException`, stores the `retryAfter` (int, seconds), and return a `429` response with a `Retry-After` header.

**Hints:**
- Add a `public readonly int $retryAfter` to the exception constructor.
- In the catch block, use `$response->headers->set('Retry-After', ...)`.
- HTTP status `429` = `Response::HTTP_TOO_MANY_REQUESTS`.

**Testing:** `curl -i https://127.0.0.1:8000/php/exception-demo/rate-limit` should show a 429 status and `Retry-After` header.

<details><summary>Click to reveal Solution</summary>

`src/Exception/RateLimitExceededException.php`:
```php
<?php

namespace App\Exception;

class RateLimitExceededException extends \RuntimeException
{
    public function __construct(public readonly int $retryAfter = 60)
    {
        parent::__construct('Rate limit exceeded. Try again later.');
    }
}
```

Add `'rate-limit'` case and catch block:
```php
'rate-limit' => throw new \App\Exception\RateLimitExceededException(120),

// In catch:
} catch (\App\Exception\RateLimitExceededException $e) {
    $response = $this->json(
        ['status' => 'error', 'type' => 'rate_limit', 'retry_after' => $e->retryAfter],
        Response::HTTP_TOO_MANY_REQUESTS,
    );
    $response->headers->set('Retry-After', (string) $e->retryAfter);
    return $response;
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [PHP 8.4 Official Documentation](https://www.php.net/manual/en/langref.php)
- **Video Tutorials:** [Search SymfonyCasts for "Exception and error handling"](https://symfonycasts.com/search?q=exception%2Band%2Berror%2Bhandling)
