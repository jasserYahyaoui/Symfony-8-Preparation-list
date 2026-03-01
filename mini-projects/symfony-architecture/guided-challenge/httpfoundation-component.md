## HttpFoundation component - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create a `/architecture/manual-response` endpoint that builds a `Response` object completely manually (no `AbstractController::json()`): set content, status, content-type header.

**Hints:**
- `new Response($content, $status)`.
- `$response->headers->set('Content-Type', 'application/json')`.
- Use `json_encode()` manually.

**Testing:** `curl -i https://127.0.0.1:8000/architecture/manual-response` — verify headers.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/manual-response', name: 'arch_manual_response', methods: ['GET'])]
public function manualResponse(): Response
{
    $data = ['built' => 'manually', 'without' => 'AbstractController'];
    $content = json_encode($data, JSON_PRETTY_PRINT);

    $response = new Response($content, Response::HTTP_OK);
    $response->headers->set('Content-Type', 'application/json');
    $response->headers->set('X-Built-By', 'HttpFoundation');

    return $response;
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "HttpFoundation component"](https://symfonycasts.com/search?q=httpfoundation%2Bcomponent)
