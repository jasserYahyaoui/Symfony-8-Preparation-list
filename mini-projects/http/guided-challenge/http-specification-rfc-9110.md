## HTTP Specification (RFC 9110) - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create an endpoint `/http/echo` that echoes back the FULL raw request (method, path, all headers, body) as a JSON response, demonstrating complete HTTP request anatomy.

**Hints:**
- Use `$request->headers->all()` for all headers.
- Use `$request->getContent()` for the raw body.
- Use `$request->getMethod()` for the HTTP verb.

**Testing:** `curl -X POST -H "X-Custom: hello" -d "payload" https://127.0.0.1:8000/http/echo` should return everything.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/echo', name: 'http_echo', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])]
public function echo(Request $request): JsonResponse
{
    return $this->json([
        'method' => $request->getMethod(),
        'path' => $request->getPathInfo(),
        'query' => $request->query->all(),
        'headers' => $request->headers->all(),
        'body' => $request->getContent(),
        'content_type' => $request->getContentTypeFormat(),
    ]);
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "HTTP Specification (RFC 9110)"](https://symfonycasts.com/search?q=http%2Bspecification%2B%28rfc%2B9110%29)
