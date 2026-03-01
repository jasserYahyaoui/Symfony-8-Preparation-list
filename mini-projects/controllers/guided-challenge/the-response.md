## The response - Guided Challenge

> **Phase:** Phase 2 (For Revision)


**Goal:** Create an endpoint that returns different response types based on a `format` query parameter.

<details><summary>Click to reveal Solution</summary>

```php
#[Route('/multi-format', name: 'ctrl_multi_format', methods: ['GET'])]
public function multiFormat(Request $request): Response
{
    $data = ['title' => 'Symfony', 'version' => '8.0'];
    return match ($request->query->get('format', 'json')) {
        'json' => $this->json($data),
        'text' => new Response(implode(': ', $data), 200, ['Content-Type' => 'text/plain']),
        'xml' => new Response('<root><title>Symfony</title></root>', 200, ['Content-Type' => 'application/xml']),
        default => $this->json($data),
    };
}
```

</details>


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "The response"](https://symfonycasts.com/search?q=the%2Bresponse)
