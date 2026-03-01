## HTTP response - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create an endpoint `/http/response-download` that returns a dynamically-generated CSV file as a download (using `StreamedResponse`).

**Hints:**
- Set `Content-Type: text/csv` and `Content-Disposition: attachment; filename="export.csv"`.
- Use `StreamedResponse` to write CSV rows.
- Headers: use `$response->headers->set(...)`.

**Testing:** `curl -O -J https://127.0.0.1:8000/http/response-download` should save a `export.csv` file.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/response-download', name: 'http_response_download', methods: ['GET'])]
public function download(): StreamedResponse
{
    $response = new StreamedResponse(function () {
        $handle = fopen('php://output', 'w');
        fputcsv($handle, ['Name', 'Email', 'Score']);
        fputcsv($handle, ['Alice', 'alice@test.com', 95]);
        fputcsv($handle, ['Bob', 'bob@test.com', 87]);
        fputcsv($handle, ['Charlie', 'charlie@test.com', 92]);
        fclose($handle);
    });

    $response->headers->set('Content-Type', 'text/csv');
    $response->headers->set('Content-Disposition', 'attachment; filename="export.csv"');

    return $response;
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "HTTP response"](https://symfonycasts.com/search?q=http%2Bresponse)
