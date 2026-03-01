## Content negotiation - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Add support for `text/csv` format in the `/http/negotiate` endpoint.

**Hints:**
- Check for format `csv` or match against `text/csv` in Accept header.
- Return comma-separated values with `Content-Type: text/csv`.

**Testing:** `curl -H "Accept: text/csv" https://127.0.0.1:8000/http/negotiate`.

<details><summary>Click to reveal Solution</summary>

Add to the match expression:
```php
'csv' => new Response(
    implode(',', array_keys($data)) . "\n" . implode(',', array_values($data)),
    Response::HTTP_OK,
    ['Content-Type' => 'text/csv']
),
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Content negotiation"](https://symfonycasts.com/search?q=content%2Bnegotiation)
