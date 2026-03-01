## Internal redirects - Full Tutorial

> **Phase:** Phase 1 (For Initial Learning)


```php
#[Route('/forward-demo', name: 'ctrl_forward')]
public function forwardDemo(): Response
{
    // Internally forwards to another controller — no HTTP redirect
    return $this->forward(AbstractDemoController::class . '::index');
}
```

**Step 4:** Test: `curl https://127.0.0.1:8000/controllers/forward-demo` — you get the response from `AbstractDemoController::index` but the URL stays.


---

### 📚 Official Certification Resources
- **Documentation:** [Symfony 8.0 Official Documentation](https://symfony.com/doc/current/index.html)
- **Video Tutorials:** [Search SymfonyCasts for "Internal redirects"](https://symfonycasts.com/search?q=internal%2Bredirects)
